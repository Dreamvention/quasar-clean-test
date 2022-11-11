import { IInstanceData } from '../';

export interface IEnrollmentData {
  id?: string;
  uniqueId?: string;
  learningObjectId?: string;
  enrollmentSource: string;
  progressPercent: number;
  completionDeadline: string;
  enrollmentDeadline?: string;
  dateEnrolled: string;
  hasPassed: boolean;
  score: number;
  state: EnrollmentStateTypes;
  name: string;
  instance?: IInstanceData;
}

export enum EnrollmentStateTypes {
  Enrolled = 'ENROLLED',
  Started = 'STARTED',
  Completed = 'COMPLETED',
  Approved = 'APPROVED',
  Pending = 'PENDING_APPROVAL',
}

export interface IEnrollment extends IEnrollmentData {
  validate(): void;
}
