import { IsEmail, IsString, IsOptional, IsEnum, MinLength, MaxLength, IsBoolean } from 'class-validator';
import { UserRole, UserStatus } from '../enums/user.enums';
import { AuthProvider } from '../types/user.types';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @IsOptional()
  password?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsString()
  @IsOptional()
  provider?: AuthProvider;

  @IsString()
  @IsOptional()
  providerId?: string;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  firstName?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsOptional()
  profile?: {
    bio?: string;
    phone?: string;
    location?: string;
    website?: string;
    company?: string;
    jobTitle?: string;
    timezone?: string;
    language?: string;
  };

  @IsOptional()
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    emailNotifications?: boolean;
    pushNotifications?: boolean;
  };
}

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  newPassword: string;
}

export class UpdateUserStatusDto {
  @IsEnum(UserStatus)
  status: UserStatus;
}

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
} 