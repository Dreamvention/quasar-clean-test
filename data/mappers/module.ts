import { Module, IModuleData, IModule, ModuleContentTypes, LocaleTypes, IModuleResourceData } from 'domain/entities';
import {
  ILearningObjectResourceResponse,
  IncludedType,
  LoResourceType,
  guards,
  IResource,
} from '../repositories/prime';
import { withLocale, NoteMap } from './';
export class ModuleMap extends withLocale {
  constructor(public locale: LocaleTypes, public noteMap: NoteMap) {
    super();
  }

  toDomain(data: IModuleData): IModule {
    const module = new Module(data);
    // learningObject.validate();
    return module;
  }

  toData(data: ILearningObjectResourceResponse, included?: IncludedType[]): IModuleData {
    const learningObjectResourceGrade = included
      ?.filter(guards.isGrade)
      .find((grade) => grade.relationships.loResource?.data.id === data.id);
    const learningObjectNotes = included
      ?.filter(guards.isNote)
      .filter((n) => n.relationships?.loResource?.data.id === data.id);

    return {
      id: data.id,
      courseId: data.relationships?.learningObject?.data.id || '',
      instanceId: data.relationships?.loInstance?.data.id || '',
      name: this.toLocale(data.attributes?.localizedMetadata)?.name || '',
      description: this.toLocale(data.attributes?.localizedMetadata)?.description || '',
      contentType: this.toModuleContentType(data.attributes?.loResourceType),
      hasPassed: learningObjectResourceGrade?.attributes.hasPassed || false,
      progress: learningObjectResourceGrade?.attributes.progressPercent || 0,
      durationInMinutes: learningObjectResourceGrade?.attributes.duration || 0,
      notes: learningObjectNotes?.map((n) => this.noteMap.toData(n)) || [],
      mandatory: data.attributes?.mandatory || false,
      isSubmissible: data.attributes.resourceSubType == 'SUBMISSION' && data.attributes.resourceType == 'Activity',
    };
  }

  toResources(resource: IResource): IModuleResourceData {
    return {
      id: resource.id,
      contentType: resource.attributes.contentType,
      contentZipUrl: resource.attributes.contentZipUrl,
    };
  }
  toModuleContentType(loResourceType: LoResourceType | undefined): ModuleContentTypes {
    if (loResourceType == 'Test Out') return ModuleContentTypes.TestOut;
    if (loResourceType == 'Pre Work') return ModuleContentTypes.PreWork;
    return ModuleContentTypes.Content;
  }
}
