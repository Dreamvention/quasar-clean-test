import { object, use } from 'rsdi';
import {
  ErrorMap,
  AuthMap,
  UserMap,
  AnnouncementMap,
  LearningObjectMap,
  NoteMap,
  ModuleMap,
  InstanceMap,
  EnrollmentMap,
} from 'data/mappers';
export const mappers = {
  ErrorMap: object(ErrorMap),
  AuthMap: object(AuthMap),
  UserMap: object(UserMap).construct(use('apiImageURL')),
  AnnouncementMap: object(AnnouncementMap).construct(use('apiBaseURL')),
  NoteMap: object(NoteMap),
  ModuleMap: object(ModuleMap).construct(use('locale'), use('NoteMap')),
  InstanceMap: object(InstanceMap).construct(use('locale'), use('ModuleMap')),
  EnrollmentMap: object(EnrollmentMap).construct(use('locale'), use('InstanceMap')),
  LearningObjectMap: object(LearningObjectMap).construct(
    use('locale'),
    use('ModuleMap'),
    use('InstanceMap'),
    use('EnrollmentMap')
  ),
};
