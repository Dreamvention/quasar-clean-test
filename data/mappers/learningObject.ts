import {
  ILearningObjectData,
  ILearningObject,
  LearningObjectTypes,
  LearningObjectFactory,
  LocaleTypes,
  LearningObjectEnrollmentTypes,
} from 'domain/entities';
import { ILearningObjectResponse, LoType, LoEnrollmentType, IncludedType, guards } from '../repositories/prime';
import { withLocale, ModuleMap, InstanceMap, EnrollmentMap } from './';

export class LearningObjectMap extends withLocale {
  constructor(
    public locale: LocaleTypes,
    public moduleMap: ModuleMap,
    public instanceMap: InstanceMap,
    public enrollmentMap: EnrollmentMap
  ) {
    super();
  }

  toDomain(data: ILearningObjectData): ILearningObject {
    const learningObject = new LearningObjectFactory().createLearningObject(data);
    // learningObject.validate();
    return learningObject;
  }

  toData(data: ILearningObjectResponse, included?: IncludedType[]): ILearningObjectData {
    // const learningObjectResources = included
    //   ?.filter(guards.isResource)
    //   .filter((lor) => lor.relationships?.learningObject?.data.id === data.id);
    const learningObjects = data.relationships?.subLOs?.data.map(
      (item) =>
        included?.filter(guards.isLearningObject).find((lo) => lo.id === item.id) || ({} as ILearningObjectResponse)
    );
    const learningObjectInstances = included
      ?.filter(guards.isInstance)
      .filter((i) => i.relationships?.learningObject?.data.id === data.id);
    const learningObjectInstanceEnrollment = included
      ?.filter(guards.isEnrollment)
      .find((e) => e.relationships?.learningObject?.data.id === data.id);

    //sorting
    // if (learningObjectResources && learningObjectInstances && learningObjectInstances[0].relationships?.loResources) {
    //   const ids = learningObjectInstances[0].relationships.loResources.data.map((lor) => lor.id);
    //   learningObjectResources.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
    // }

    return {
      id: data?.id,
      image: data.attributes?.imageUrl || '',
      name: this.toLocale(data.attributes.localizedMetadata)?.name || '',
      duration: data.attributes.duration || 0,
      enrollmentType: this.toEnrollmentType(data.attributes.enrollmentType),
      description: this.toLocale(data.attributes.localizedMetadata)?.overview || '',
      type: this.toLearningObjectType(data.attributes.loType),
      isExternal: data.attributes.isExternal || false,
      isOrdered: data.attributes?.isSubLoOrderEnforced || false,
      unenrollmentAllowed: data.attributes.unenrollmentAllowed || false,
      file: data.attributes.url || '',
      // modules: learningObjectResources?.map((m) => this.moduleMap.toData(m, included)),
      courses: learningObjects?.map((lo) => this.toData(lo, included)),
      instances: learningObjectInstances?.map((i) => this.instanceMap.toData(i, included)),
      enrollment: learningObjectInstanceEnrollment
        ? this.enrollmentMap.toData(learningObjectInstanceEnrollment, included)
        : undefined,
    };
  }

  toLearningObjectType(loType: LoType | undefined): LearningObjectTypes {
    if (loType == 'learningProgram') return LearningObjectTypes.LearningProgram;
    if (loType == 'jobAid') return LearningObjectTypes.JobAid;
    if (loType == 'certification') return LearningObjectTypes.Certification;
    else return LearningObjectTypes.Course;
  }

  toEnrollmentType(LoEnrollmentType: LoEnrollmentType | undefined): LearningObjectEnrollmentTypes {
    if (LoEnrollmentType == 'Admin Enroll') return LearningObjectEnrollmentTypes.AdminEnroll;
    if (LoEnrollmentType == 'Manager Approval') return LearningObjectEnrollmentTypes.ManagerApproval;
    return LearningObjectEnrollmentTypes.SelfEnroll;
  }
}

// const learningObjectResources = include?.filter(guards.isLearningObjectResource).filter(lor => lor.relationships?.learningObject?.data.id === data.id);
//     const learningObjectInstance = include?.filter(guards.isInstance).find(i => i.relationships?.learningObject?.data.id === data.id);
//     const learningObjectInstanceEnrollment = include?.filter(guards.isEnrollment).find(e => e.relationships?.learningObject?.data.id === data.id )
//     const learningObjects = data.relationships?.subLOs?.data.map( item => include?.filter(guards.isLearningObject).find(lo => lo.id === item.id)!)

//     return {
//         id: data.id,
//         name: localizeMetadata(data.attributes?.localizedMetadata, 'en-US')?.name || '',
//         description: localizeMetadata(data.attributes?.localizedMetadata, 'en-US')?.description || '',
//         type: mapToLearningObjectType(data.attributes.loType),
//         modules: learningObjectResources?.map(r => mapToModuleData(r, include)),
//         courses: learningObjects?.map(lo => mapToLearningObjectData(lo, include)),
//         instance: learningObjectInstance ? mapToInstanceData(learningObjectInstance) : undefined,
//         enrollment: learningObjectInstanceEnrollment ? mapToEnrollmentData(learningObjectInstanceEnrollment) : undefined
//     }
