import { Note, INoteData, INote } from 'domain/entities';

import { ILearningObjectNoteResponse } from '../repositories/prime';
export class NoteMap {
  toDomain(data: INoteData): INote {
    const module = new Note(data);
    // learningObject.validate();
    return module;
  }

  toData(data: ILearningObjectNoteResponse): INoteData {
    return {
      id: data.id,
      text: data.attributes.text,
      marker: data.attributes?.marker || '1',
    };
  }
}
