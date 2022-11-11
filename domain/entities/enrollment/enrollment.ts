import { IEnrollment, IEnrollmentData, EnrollmentStateTypes } from '.';
import { Instance } from '../';

export class Enrollment implements IEnrollment {
  id?: string | undefined;
  uniqueId?: string | undefined;
  learningObjectId?: string | undefined;
  completionDeadline = '';
  enrollmentDeadline: string | undefined;
  dateEnrolled = '';
  enrollmentSource = '';
  progressPercent = 0;
  hasPassed = false;
  score = 0;
  state: EnrollmentStateTypes = EnrollmentStateTypes.Enrolled;
  name = '';
  instance?: Instance | undefined;

  constructor(data: IEnrollmentData) {
    Object.assign(this, data);
    if (data?.instance) this.instance = new Instance(data.instance);
  }

  validate(): void {
    throw new Error('Method not implemented.');
  }
}
