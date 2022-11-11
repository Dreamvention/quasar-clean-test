import { IInstance, IInstanceData, InstanceStateTypes } from '.';
import { Module } from '../';

export class Instance implements IInstance {
  id?: string | undefined;
  name = '';
  dateCreated = '';
  isDefault = true;
  isFlexible = false;
  completionDeadline = '';
  enrollmentDeadline = '';
  state: InstanceStateTypes = InstanceStateTypes.Active;
  modules: Module[] = [];

  constructor(data: IInstanceData) {
    Object.assign(this, data);
    if (data?.modules) this.modules = data.modules.map((m) => new Module(m));
  }

  validate(): void {
    throw new Error('Method not implemented.');
  }
}
