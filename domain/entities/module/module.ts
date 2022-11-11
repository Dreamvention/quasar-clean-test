import { IModule, IModuleData, ModuleContentTypes, IModuleResourceData } from '.';
import { INote, Note } from '../';

export class Module implements IModule {
  id = '';
  courseId = '';
  instanceId = '';
  hasPassed = false;
  contentType: ModuleContentTypes = ModuleContentTypes.Content;
  progress = 0;
  durationInMinutes = 0;
  name = '';
  description = '';
  notes: INote[] = [];
  isSubmissible = false;
  mandatory = false;
  resources?: IModuleResourceData[];

  constructor(data: IModuleData) {
    Object.assign(this, data);
    if (data.notes) this.notes.map((n) => new Note(n));
  }

  validate(): void {
    throw new Error('Method not implemented.');
  }

  get isUploadable(): boolean {
    return this.isSubmissible;
  }
}
