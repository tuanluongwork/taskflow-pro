export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  stack?: string;
}

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  size: number;
  buffer?: Buffer;
  url?: string;
}

export type SortOrder = 'ASC' | 'DESC';

export interface QueryOptions {
  where?: any;
  order?: { [key: string]: SortOrder };
  skip?: number;
  take?: number;
  relations?: string[];
} 