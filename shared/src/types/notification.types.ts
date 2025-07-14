import { BaseEntity } from './common.types';
import { NotificationType, NotificationStatus } from '../enums/notification.enums';

export interface Notification extends BaseEntity {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  status: NotificationStatus;
  readAt?: Date;
  metadata?: NotificationMetadata;
  actionUrl?: string;
}

export interface NotificationMetadata {
  taskId?: string;
  projectId?: string;
  commentId?: string;
  userId?: string;
  entityType?: string;
  entityId?: string;
  [key: string]: any;
}

export interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  metadata?: NotificationMetadata;
  actionUrl?: string;
}

export interface NotificationPreference {
  userId: string;
  type: NotificationType;
  email: boolean;
  push: boolean;
  inApp: boolean;
}

export interface EmailNotification {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
}

export interface PushNotification {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  icon?: string;
  badge?: number;
  sound?: string;
}

export interface WebSocketMessage {
  event: string;
  data: any;
  userId?: string;
  room?: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
} 