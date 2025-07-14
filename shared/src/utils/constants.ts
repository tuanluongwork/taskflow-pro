export const API_VERSION = 'v1';

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export const JWT_EXPIRES_IN = '7d';
export const REFRESH_TOKEN_EXPIRES_IN = '30d';

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 100;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;

export const TASK_TITLE_MAX_LENGTH = 200;
export const TASK_DESCRIPTION_MAX_LENGTH = 2000;

export const PROJECT_NAME_MAX_LENGTH = 100;
export const PROJECT_CODE_MAX_LENGTH = 20;

export const COMMENT_MAX_LENGTH = 1000;

export const FILE_UPLOAD_MAX_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv'
];

export const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;

export const CACHE_TTL = {
  USER: 5 * 60, // 5 minutes
  PROJECT: 10 * 60, // 10 minutes
  TASK: 5 * 60, // 5 minutes
  NOTIFICATION: 1 * 60, // 1 minute
};

export const ERROR_CODES = {
  // Authentication errors
  INVALID_CREDENTIALS: 'AUTH001',
  TOKEN_EXPIRED: 'AUTH002',
  TOKEN_INVALID: 'AUTH003',
  UNAUTHORIZED: 'AUTH004',
  FORBIDDEN: 'AUTH005',
  
  // Validation errors
  VALIDATION_ERROR: 'VAL001',
  INVALID_INPUT: 'VAL002',
  
  // Resource errors
  NOT_FOUND: 'RES001',
  ALREADY_EXISTS: 'RES002',
  CONFLICT: 'RES003',
  
  // Server errors
  INTERNAL_ERROR: 'SRV001',
  SERVICE_UNAVAILABLE: 'SRV002',
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'RATE001',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  LOGOUT_SUCCESS: 'Successfully logged out',
  REGISTER_SUCCESS: 'Account created successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  PASSWORD_RESET: 'Password reset successfully',
  EMAIL_VERIFIED: 'Email verified successfully',
  
  TASK_CREATED: 'Task created successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
  
  PROJECT_CREATED: 'Project created successfully',
  PROJECT_UPDATED: 'Project updated successfully',
  PROJECT_DELETED: 'Project deleted successfully',
  
  USER_UPDATED: 'User profile updated successfully',
  PREFERENCES_UPDATED: 'Preferences updated successfully',
};

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,30}$/,
  PASSWORD: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  PHONE: /^\+?[\d\s-()]+$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
}; 