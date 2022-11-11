import { INoteData, INote } from '../';

export interface IModule extends IModuleData {
  validate(): void;
  isUploadable: boolean;
  notes?: INote[];
}

export interface IModuleData {
  id: string;
  courseId: string;
  instanceId: string;
  hasPassed: boolean;
  contentType: ModuleContentTypes;
  progress: number;
  durationInMinutes: number;
  name: string;
  description: string;
  notes?: INoteData[];
  isSubmissible: boolean;
  mandatory: boolean;
  resources?: IModuleResourceData[];
}

export enum ModuleContentTypes {
  Content = 'Content',
  TestOut = 'Test Out',
  PreWork = 'Pre Work',
}

export interface IModuleResourceData {
  id: string;
  contentType: string;
  contentZipUrl?: string;
}
