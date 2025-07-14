import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../modules/users/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const response = await this.authService.login({ email, password });
    return response.user;
  }

  @Mutation(() => User)
  async register(
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
  ) {
    const response = await this.authService.register({
      email,
      username,
      password,
      firstName,
      lastName,
    });
    return response.user;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async logout(
    @CurrentUser() user: User,
    @Args('refreshToken') refreshToken: string,
  ) {
    await this.authService.logout(user.id, refreshToken);
    return true;
  }
} 