import { LearningObject, ILearningObjectData, ICourse, Course } from '../';
import { ILearningProgram } from '.';

export class LearningProgram extends LearningObject implements ILearningProgram {
  courses: ICourse[] = [];
  constructor(data: ILearningObjectData) {
    super(data);
    if (data?.courses) {
      this.courses = data.courses.map((c) => new Course(c));
    }
  }

  get activeCourseId(): string | undefined {
    return this.courses.find((c) => !c.hasPassed)?.id || this.courses[0]?.id;
  }

  validate(): void {
    throw new Error('Method not implemented.');
  }
}
