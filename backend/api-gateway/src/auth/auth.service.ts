import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../modules/users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { UsersService } from '../modules/users/users.service';

import {
  LoginDto,
  RegisterDto,
  AuthResponse,
  JwtPayload,
  OAuth2Profile,
  RefreshTokenDto,
  ChangePasswordDto,
  ResetPasswordDto,
  ForgotPasswordDto,
} from '@taskflow/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAuthResponse(user);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Check if username is taken
    const existingUsername = await this.usersService.findByUsername(registerDto.username);
    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return this.generateAuthResponse(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthResponse> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token: refreshTokenDto.refreshToken, isValid: true },
      relations: ['user'],
    });

    if (!refreshToken || refreshToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Invalidate old refresh token
    refreshToken.isValid = false;
    await this.refreshTokenRepository.save(refreshToken);

    return this.generateAuthResponse(refreshToken.user);
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    await this.refreshTokenRepository.update(
      { token: refreshToken, userId },
      { isValid: false }
    );
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValidPassword = await bcrypt.compare(changePasswordDto.currentPassword, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.usersService.update(userId, { password: hashedPassword });

    // Invalidate all refresh tokens
    await this.refreshTokenRepository.update(
      { userId },
      { isValid: false }
    );
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      // Don't reveal if user exists
      return;
    }

    // Generate reset token
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // 1 hour expiry

    await this.usersService.update(user.id, {
      resetToken,
      resetTokenExpiry,
    });

    // TODO: Send email with reset link
    console.log(`Password reset token for ${user.email}: ${resetToken}`);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const user = await this.usersService.findByResetToken(resetPasswordDto.token);
    if (!user || user.resetTokenExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    await this.usersService.update(user.id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });
  }

  async validateOAuth2User(profile: OAuth2Profile): Promise<User> {
    let user = await this.usersService.findByProviderId(profile.provider, profile.id);

    if (!user) {
      // Check if user with email exists
      user = await this.usersService.findByEmail(profile.email);

      if (user) {
        // Link OAuth provider to existing user
        await this.usersService.update(user.id, {
          provider: profile.provider,
          providerId: profile.id,
        });
      } else {
        // Create new user
        user = await this.usersService.create({
          email: profile.email,
          username: profile.email.split('@')[0] + '_' + Date.now(),
          firstName: profile.firstName || profile.name?.split(' ')[0] || '',
          lastName: profile.lastName || profile.name?.split(' ')[1] || '',
          provider: profile.provider,
          providerId: profile.id,
          avatar: profile.picture,
          emailVerified: true,
        });
      }
    }

    return user;
  }

  private async generateAuthResponse(user: User): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.createRefreshToken(user);

    // Update last login
    await this.usersService.update(user.id, { lastLoginAt: new Date() });

    return {
      user,
      accessToken,
      refreshToken: refreshToken.token,
      expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
    };
  }

  private async createRefreshToken(user: User): Promise<RefreshToken> {
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    const refreshToken = this.refreshTokenRepository.create({
      token,
      userId: user.id,
      user,
      expiresAt,
      isValid: true,
    });

    return this.refreshTokenRepository.save(refreshToken);
  }
} 