import { ILearningObject, ICourse } from '../';

export interface ICertification extends ILearningObject {
  courses: ICourse[];
}
