import { Instance, IInstanceData, IInstance, InstanceStateTypes, LocaleTypes } from 'domain/entities';
import { ModuleMap } from './';
import { ILearningObjectInstanceResponse, LoInstanceStateType, IncludedType, guards } from '../repositories/prime';
import { withLocale } from './';
export class InstanceMap extends withLocale {
  constructor(public locale: LocaleTypes, public moduleMap: ModuleMap) {
    super();
  }

  toDomain(data: IInstanceData): IInstance {
    const module = new Instance(data);
    // learningObject.validate();
    return module;
  }

  toData(data: ILearningObjectInstanceResponse, included?: IncludedType[]): IInstanceData {
    const learningObjectResources = included
      ?.filter(guards.isResource)
      .filter((lor) => lor.relationships?.loInstance?.data.id === data.id);
    const ids = data.relationships?.loResources?.data.map((lor) => lor.id);
    if (ids && learningObjectResources) learningObjectResources.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));

    return {
      id: data.id,
      name: this.toLocale(data.attributes?.localizedMetadata)?.name || '',
      dateCreated: data.attributes.dateCreated,
      isDefault: data.attributes.isDefault,
      isFlexible: data.attributes.isFlexible,
      completionDeadline: data.attributes.completionDeadline || '',
      enrollmentDeadline: data.attributes.enrollmentDeadline || '',
      state: this.toInstanceStateType(data.attributes.state),
      modules: learningObjectResources?.map((l) => this.moduleMap.toData(l, included)) || [],
    };
  }

  toInstanceStateType(state: LoInstanceStateType | undefined): InstanceStateTypes {
    if (state == 'Retired') return InstanceStateTypes.Retired;
    return InstanceStateTypes.Active;
  }
}
