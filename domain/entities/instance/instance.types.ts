import { IModuleData } from '../';

export interface IInstanceData {
  id?: string;
  name: string;
  dateCreated: string;
  isDefault: boolean;
  isFlexible: boolean;
  completionDeadline: string;
  enrollmentDeadline: string;
  state: InstanceStateTypes;
  modules: IModuleData[];
}

export enum InstanceStateTypes {
  Active = 'Active',
  Retired = 'Retired',
}

export interface IInstance extends IInstanceData {
  validate(): void;
}
