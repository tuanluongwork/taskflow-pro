import { IsString, IsOptional, IsEnum, IsUUID, IsDateString, IsNumber, IsArray, MinLength, MaxLength, Min } from 'class-validator';
import { TaskStatus, TaskPriority, TaskType } from '../enums/task.enums';

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title!: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @IsUUID()
  projectId!: string;

  @IsUUID()
  @IsOptional()
  assigneeId?: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsEnum(TaskType)
  @IsOptional()
  type?: TaskType;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  estimatedHours?: number;

  @IsUUID()
  @IsOptional()
  parentTaskId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

export class UpdateTaskDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  @IsOptional()
  title?: string;

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsUUID()
  @IsOptional()
  assigneeId?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  estimatedHours?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  actualHours?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  code!: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export class AddCommentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  content!: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  mentions?: string[];
}

export class TaskFilterDto {
  @IsArray()
  @IsEnum(TaskStatus, { each: true })
  @IsOptional()
  status?: TaskStatus[];

  @IsArray()
  @IsEnum(TaskPriority, { each: true })
  @IsOptional()
  priority?: TaskPriority[];

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  assigneeId?: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  projectId?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsDateString()
  @IsOptional()
  dueDateFrom?: string;

  @IsDateString()
  @IsOptional()
  dueDateTo?: string;

  @IsString()
  @IsOptional()
  search?: string;
} 