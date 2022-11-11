import { ILearningObject, ILearningObjectData, LearningObjectTypes, LearningObjectEnrollmentTypes } from '.';
import {
  Course,
  LearningProgram,
  Certification,
  JobAid,
  Instance,
  Enrollment,
  EnrollmentStateTypes,
  InstanceStateTypes,
} from '../';

export class LearningObjectFactory {
  createLearningObject(data: ILearningObjectData): Course | Certification | LearningProgram | JobAid {
    if (data?.type == LearningObjectTypes.JobAid) {
      return new JobAid(data);
    } else if (data?.type == LearningObjectTypes.LearningProgram) {
      return new LearningProgram(data);
    } else if (data?.type == LearningObjectTypes.Certification) {
      return new Certification(data);
    }
    return new Course(data);
  }
}

export abstract class LearningObject implements ILearningObject {
  id?: string | undefined;
  name = '';
  image = '';
  duration = 0;
  enrollmentType = LearningObjectEnrollmentTypes.SelfEnroll;
  description = '';
  isExternal = false;
  isOrdered = false;
  unenrollmentAllowed = false;
  file = '';
  type: LearningObjectTypes = LearningObjectTypes.Course;
  instances?: Instance[] = [];
  enrollment?: Enrollment | undefined;

  constructor(data: ILearningObjectData) {
    Object.assign(this, data);
    if (data?.instances) this.instances = data.instances.map((i) => new Instance(i));
    if (data?.enrollment) this.enrollment = new Enrollment(data.enrollment);
  }

  get numId(): number | undefined {
    const numId = this.id?.split(':')[1];
    if (numId) {
      return +numId;
    }
    return;
  }

  get activeCourseId(): string | undefined {
    return this.id;
  }

  get activeInstances() {
    if (this.instances) return this.instances.filter((i) => i.state == InstanceStateTypes.Active);
  }

  get activeInstance() {
    if (this.enrollment) return this.enrollment.instance;
    if (this.activeInstances) {
      const activeInstance = this.activeInstances.find((i) => i.isDefault);
      if (activeInstance) return activeInstance;
      this.activeInstances[0];
    }
  }

  get isEnrollable(): boolean {
    if (!this.enrollment && this.activeInstances && !this.isDeadlinePassed) return true;
    return false;
  }

  get isActive(): boolean {
    if (this.enrollment && !this.isDeadlinePassed) return true;
    return false;
  }

  get isEnrolled(): boolean {
    if (this.enrollment && this.enrollment.state == EnrollmentStateTypes.Enrolled) return true;
    return false;
  }

  get isStarted(): boolean {
    if (this.enrollment && this.enrollment.state == EnrollmentStateTypes.Started) return true;
    return false;
  }

  get isPending(): boolean {
    if (this.enrollment && this.enrollment.state == EnrollmentStateTypes.Pending) return true;
    return false;
  }

  get isCompleted(): boolean {
    if (this.enrollment && this.enrollment.state == EnrollmentStateTypes.Completed) return true;
    return false;
  }

  get isUploadable(): boolean {
    return false;
  }

  get isUnenrollable(): boolean {
    return this.isActive && this.unenrollmentAllowed && !this.isCompleted;
  }

  get deadline(): string | undefined {
    // if (this.isCompleted) {
    //   return;
    // }

    if (this.enrollment?.completionDeadline) {
      return this.enrollment?.completionDeadline;
    }
    if (this.activeInstances && this.activeInstances.length > 0 && this.activeInstances[0]?.completionDeadline) {
      return this.activeInstances[0].completionDeadline;
    }
    if (this.activeInstances && this.activeInstances.length > 0 && this.activeInstances[0]?.enrollmentDeadline) {
      return this.activeInstances[0].enrollmentDeadline;
    }
  }

  get deadlineDate(): Date | undefined {
    if (this?.deadline && Date.parse(this.deadline)) {
      return new Date(this.deadline);
    } else return;
  }
  get deadlineDays(): string | undefined {
    if (this.deadline && this.deadline.includes('d')) {
      return this.deadline.split('d')[0];
    }
  }

  get isDeadlinePassed(): boolean {
    if (this.hasPassed) return false;
    if (this.deadlineDays) return false;
    if (this.deadlineDate && new Date().getTime() - this.deadlineDate.getTime() > 0) return true;
    return false;
  }

  get hasPassed(): boolean {
    if (this.enrollment && this.enrollment.hasPassed) return true;
    return false;
  }

  validate(): void {
    throw new Error('Method not implemented.');
  }

  validateBeforeEnroll(): void {
    if (!this.activeInstance) throw new Error('No active instances avaliable to Enroll');

    if (this.isDeadlinePassed) throw new Error('Deadline has Passed');

    if (this.enrollmentType == LearningObjectEnrollmentTypes.AdminEnroll)
      throw new Error('Enrollment done only by Admin');

    if (this.enrollmentType == LearningObjectEnrollmentTypes.ManagerApproval)
      throw new Error('Enrollment should be approved by Manager');
  }
}
