import { ILearningObject, IModule } from '../';

export interface ICourse extends ILearningObject {
  // duration: number;
  modules: IModule[];
}
