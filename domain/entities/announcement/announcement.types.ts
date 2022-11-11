import { ILearningObjectData, ILearningObject } from '..';

export interface IAnnouncement extends IAnnouncementData {
  primaryAction: IAction;
  secondaryAction: IAction;
  validate(): void;
}

export interface IAction extends IActionData {
  learningObject?: ILearningObject;
}

export interface IAnnouncementData {
  id?: string;
  title: string;
  description: string;
  image: string;
  primaryAction: IActionData;
  secondaryAction: IActionData;
  sortOrder: number;
}

export interface IActionData {
  courseId: string;
  buttonLabel: string;
  buttonAction: ButtonActionTypes;
  learningObject?: ILearningObjectData;
  url: string;
}

export enum ButtonActionTypes {
  NoAction = '',
  GoToCourse = 'GO_TO_COURSE',
  EnrollNow = 'ENROLL_NOW',
  GoToUrl = 'GO_TO_URL',
}
