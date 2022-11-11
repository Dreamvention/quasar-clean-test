import { LearningObject } from '../';
import { ICourse } from '.';

export class Course extends LearningObject implements ICourse {
  validate(): void {
    throw new Error('Method not implemented.');
  }

  get modules() {
    if (this.activeInstance) {
      return this.activeInstance.modules;
    }
    return [];
  }
}
