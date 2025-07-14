import { BaseEntity } from './common.types';
import { UserRole, UserStatus } from '../enums/user.enums';

export interface User extends BaseEntity {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  lastLoginAt?: Date;
  provider?: AuthProvider;
  providerId?: string;
  profile?: UserProfile;
  preferences?: UserPreferences;
}

export interface UserProfile {
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  company?: string;
  jobTitle?: string;
  timezone?: string;
  language?: string;
}

export interface UserPreferences {
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface NotificationPreferences {
  taskAssigned: boolean;
  taskCompleted: boolean;
  taskCommented: boolean;
  taskDueSoon: boolean;
  weeklyReport: boolean;
}

export type AuthProvider = 'local' | 'google' | 'github';

export interface CreateUserInput {
  email: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  provider?: AuthProvider;
  providerId?: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  profile?: Partial<UserProfile>;
  preferences?: Partial<UserPreferences>;
}

export interface UserSession {
  userId: string;
  email: string;
  role: UserRole;
  sessionId: string;
  expiresAt: Date;
} 