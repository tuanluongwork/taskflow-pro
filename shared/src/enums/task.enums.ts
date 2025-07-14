export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum TaskType {
  FEATURE = 'FEATURE',
  BUG = 'BUG',
  IMPROVEMENT = 'IMPROVEMENT',
  TASK = 'TASK',
  EPIC = 'EPIC',
  STORY = 'STORY',
  SUBTASK = 'SUBTASK'
}

export enum TaskEvent {
  CREATED = 'task.created',
  UPDATED = 'task.updated',
  DELETED = 'task.deleted',
  ASSIGNED = 'task.assigned',
  UNASSIGNED = 'task.unassigned',
  STATUS_CHANGED = 'task.status_changed',
  PRIORITY_CHANGED = 'task.priority_changed',
  COMMENTED = 'task.commented',
  ATTACHMENT_ADDED = 'task.attachment_added',
  ATTACHMENT_REMOVED = 'task.attachment_removed',
  DUE_DATE_CHANGED = 'task.due_date_changed',
  COMPLETED = 'task.completed'
}