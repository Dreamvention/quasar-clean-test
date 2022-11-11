import { LearningObject, ILearningObjectData, ICourse, Course, EnrollmentStateTypes } from '../';
import { ICertification } from '.';

export class Certification extends LearningObject implements ICertification {
  courses: ICourse[] = [];
  constructor(data: ILearningObjectData) {
    super(data);
    if (data?.courses) {
      this.courses = data.courses.map((c) => new Course(c));
    }
  }
  validate(): void {
    throw new Error('Method not implemented.');
  }

  get activeCourseId(): string | undefined {
    return this.courses.find((c) => !c.hasPassed)?.id || this.courses[0]?.id;
  }

  get isUploadable(): boolean {
    console.log(this.enrollment?.state);
    return !!(
      this.enrollment &&
      ![EnrollmentStateTypes.Pending, EnrollmentStateTypes.Approved, EnrollmentStateTypes.Completed].includes(
        this.enrollment.state
      ) &&
      this.isExternal
    );
  }
}
