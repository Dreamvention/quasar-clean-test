import { ILearningObject, ICourse } from '../';

export interface ILearningProgram extends ILearningObject {
  courses: ICourse[];
}
