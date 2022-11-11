import {
  IAnnouncementData,
  IAnnouncement,
  Announcement,
  ButtonActionTypes,
  ILearningObjectData,
} from 'domain/entities';
import { ISlideResponse, ButtonActionType } from '../repositories/api';

export class AnnouncementMap {
  constructor(public apiBaseURL: string) {}

  toDomain(data: IAnnouncementData): IAnnouncement {
    const announcement = new Announcement(data);
    announcement.validate();
    return announcement;
  }

  toData(data: ISlideResponse, learningObjectsData: ILearningObjectData[]): IAnnouncementData {
    return {
      id: data.id,
      title: data.header,
      description: data.description,
      image: this.apiBaseURL + data.imageUrl,
      primaryAction: {
        courseId: data.primaryActionUrl,
        buttonLabel: data.primaryButtonLabel,
        buttonAction: this.toButtonActionType(data.primaryAction),
        learningObject: learningObjectsData.find((lo) => lo.id == data.primaryActionUrl),
        url: data.primaryActionUrl,
      },
      secondaryAction: {
        courseId: data.secondaryActionUrl,
        buttonLabel: data.secondaryButtonLabel,
        buttonAction: this.toButtonActionType(data.secondaryAction),
        learningObject: learningObjectsData.find((lo) => lo.id == data.secondaryActionUrl),
        url: data.secondaryActionUrl,
      },
      sortOrder: data.order,
    };
  }

  toButtonActionType(buttonAction: ButtonActionType): ButtonActionTypes {
    if (buttonAction == 'GO_TO_COURSE') return ButtonActionTypes.GoToCourse;
    if (buttonAction == 'GO_TO_URL') return ButtonActionTypes.GoToUrl;
    if (buttonAction == 'ENROLL_NOW') return ButtonActionTypes.EnrollNow;
    return ButtonActionTypes.NoAction;
  }
}
