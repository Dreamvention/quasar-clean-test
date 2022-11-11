import { IAnnouncement, IAnnouncementData, ButtonActionTypes } from '.';
import { LearningObjectFactory, LearningObject } from '..';

export class Announcement implements IAnnouncement {
  id: string | undefined;
  title = '';
  description = '';
  image = '';
  primaryAction = {
    courseId: '',
    buttonLabel: '',
    buttonAction: ButtonActionTypes.NoAction,
    learningObject: {} as LearningObject,
    url: '',
  };
  secondaryAction = {
    courseId: '',
    buttonLabel: '',
    buttonAction: ButtonActionTypes.NoAction,
    learningObject: {} as LearningObject,
    url: '',
  };
  sortOrder = 0;

  constructor(data: IAnnouncementData) {
    Object.assign(this, data);

    if (data.primaryAction?.learningObject) {
      this.primaryAction.learningObject = new LearningObjectFactory().createLearningObject(
        data.primaryAction?.learningObject
      );
    }

    if (data.secondaryAction?.learningObject) {
      this.secondaryAction.learningObject = new LearningObjectFactory().createLearningObject(
        data.secondaryAction?.learningObject
      );
    }
  }

  validate(): void {
    if (!this.title) throw new Error('Announcement title message can not be empty.');
  }
}
