import { BaseEntity } from './common.types';
import { User } from './user.types';
import { TaskStatus, TaskPriority, TaskType } from '../enums/task.enums';

export interface Task extends BaseEntity {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  dueDate?: Date;
  startDate?: Date;
  completedAt?: Date;
  estimatedHours?: number;
  actualHours?: number;
  projectId: string;
  project?: Project;
  assigneeId?: string;
  assignee?: User;
  creatorId: string;
  creator?: User;
  parentTaskId?: string;
  parentTask?: Task;
  subtasks?: Task[];
  tags?: Tag[];
  attachments?: TaskAttachment[];
  comments?: TaskComment[];
  watchers?: User[];
  customFields?: Record<string, any>;
}

export interface Project extends BaseEntity {
  name: string;
  description?: string;
  code: string;
  startDate?: Date;
  endDate?: Date;
  status: ProjectStatus;
  ownerId: string;
  owner?: User;
  members?: ProjectMember[];
  tasks?: Task[];
  settings?: ProjectSettings;
}

export interface ProjectMember {
  userId: string;
  user?: User;
  projectId: string;
  project?: Project;
  role: ProjectRole;
  joinedAt: Date;
}

export interface ProjectSettings {
  isPublic: boolean;
  allowGuestAccess: boolean;
  defaultTaskType: TaskType;
  customFields?: CustomField[];
  workflowStates?: WorkflowState[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  projectId?: string;
}

export interface TaskAttachment extends BaseEntity {
  taskId: string;
  filename: string;
  fileSize: number;
  mimeType: string;
  url: string;
  uploadedById: string;
  uploadedBy?: User;
}

export interface TaskComment extends BaseEntity {
  taskId: string;
  content: string;
  authorId: string;
  author?: User;
  editedAt?: Date;
  mentions?: User[];
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'boolean';
  required: boolean;
  options?: string[];
  defaultValue?: any;
}

export interface WorkflowState {
  id: string;
  name: string;
  type: TaskStatus;
  order: number;
  color: string;
}

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export enum ProjectRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER'
}

// Input types
export interface CreateTaskInput {
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  priority?: TaskPriority;
  type?: TaskType;
  dueDate?: Date;
  startDate?: Date;
  estimatedHours?: number;
  parentTaskId?: string;
  tags?: string[];
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  dueDate?: Date;
  startDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  tags?: string[];
}

export interface CreateProjectInput {
  name: string;
  description?: string;
  code: string;
  startDate?: Date;
  endDate?: Date;
  settings?: Partial<ProjectSettings>;
}

export interface TaskFilter {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assigneeId?: string[];
  projectId?: string[];
  tags?: string[];
  dueDateFrom?: Date;
  dueDateTo?: Date;
  search?: string;
} 