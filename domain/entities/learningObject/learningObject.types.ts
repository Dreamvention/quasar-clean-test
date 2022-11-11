import { IModuleData, IInstanceData, IEnrollmentData, Course, LearningProgram, JobAid, Certification } from '../';

export interface ILearningObjectData {
  id?: string;
  name: string;
  image: string;
  duration: number;
  enrollmentType: LearningObjectEnrollmentTypes;
  description: string;
  type: LearningObjectTypes;
  isExternal: boolean;
  isOrdered: boolean;
  unenrollmentAllowed: boolean;
  file: string;
  modules?: IModuleData[];
  courses?: ILearningObjectData[];
  instance?: IInstanceData;
  instances?: IInstanceData[];
  enrollment?: IEnrollmentData;
}

export interface ILearningObject extends ILearningObjectData {
  numId?: number;
  activeInstances?: IInstanceData[];
  isEnrollable: boolean;
  isActive: boolean;
  isEnrolled: boolean;
  isUnenrollable: boolean;
  isStarted: boolean;
  isPending: boolean;
  isCompleted: boolean;
  isUploadable: boolean;
  deadline?: string;
  deadlineDate?: Date;
  deadlineDays?: string;
  isDeadlinePassed: boolean;
  hasPassed: boolean;
  activeCourseId?: string;
  validate(): void;
  validateBeforeEnroll(): void;
}

export enum LearningObjectTypes {
  Course = 'course',
  LearningProgram = 'learningProgram',
  JobAid = 'jobAid',
  Certification = 'certification',
}

export enum LearningObjectEnrollmentTypes {
  AdminEnroll = 'Admin Enroll',
  SelfEnroll = 'Self Enroll',
  ManagerApproval = 'Manager Approval',
}

export const LearningObjectGaurds = {
  isCourse: (item: ILearningObject): item is Course => item.type == LearningObjectTypes.Course,
  isLearningProgram: (item: ILearningObject): item is LearningProgram =>
    item.type == LearningObjectTypes.LearningProgram,
  isJobAid: (item: ILearningObject): item is JobAid => item.type == LearningObjectTypes.JobAid,
  isCertification: (item: ILearningObject): item is Certification => item.type == LearningObjectTypes.Certification,
};
