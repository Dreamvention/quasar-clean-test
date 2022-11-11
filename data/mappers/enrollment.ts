import { Enrollment, IEnrollmentData, IEnrollment, EnrollmentStateTypes, LocaleTypes } from 'domain/entities';

import { IEnrollmentResponse, IncludedType, EnrollmentStateType, guards } from '../repositories/prime';
import { withLocale, InstanceMap } from './';
export class EnrollmentMap extends withLocale {
  constructor(public locale: LocaleTypes, public instanceMap: InstanceMap) {
    super();
  }

  toDomain(data: IEnrollmentData): IEnrollment {
    const enrollment = new Enrollment(data);
    // learningObject.validate();
    return enrollment;
  }

  toData(data: IEnrollmentResponse, included?: IncludedType[]): IEnrollmentData {
    const learningObject = included
      ?.filter(guards.isLearningObject)
      .find((lo) => lo.id === data.relationships?.learningObject?.data.id);
    const learningObjectInstance = included
      ?.filter(guards.isInstance)
      .find((i) => i.relationships?.learningObject?.data.id === data.relationships?.learningObject?.data.id);

    return {
      id: data?.id,
      uniqueId: learningObject?.attributes.uniqueId,
      enrollmentSource: data.attributes.enrollmentSource,
      progressPercent: data.attributes.progressPercent,
      score: data.attributes.score,
      hasPassed: data.attributes.hasPassed,
      completionDeadline: data.attributes.completionDeadline || '',
      dateEnrolled: data.attributes.dateEnrolled || '',
      state: this.toEnrollmentStateTypes(data.attributes.state),
      name: this.toLocale(learningObject?.attributes?.localizedMetadata)?.name || '',
      instance: learningObjectInstance ? this.instanceMap.toData(learningObjectInstance, included) : undefined,
      learningObjectId: data.relationships?.learningObject?.data.id,
    };
  }

  toEnrollmentStateTypes(state: EnrollmentStateType): EnrollmentStateTypes {
    if (state == 'COMPLETED') return EnrollmentStateTypes.Completed;
    if (state == 'STARTED') return EnrollmentStateTypes.Started;
    if (state == 'APPROVED') return EnrollmentStateTypes.Approved;
    if (state == 'PENDING_APPROVAL') return EnrollmentStateTypes.Pending;
    return EnrollmentStateTypes.Enrolled;
  }
}
