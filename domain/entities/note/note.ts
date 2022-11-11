import { INote, INoteData, NoteTypes } from '.';

export class Note implements INote {
  id?: string | undefined;
  text = '';
  marker = '';

  constructor(data: INoteData) {
    Object.assign(this, data);
  }

  validate(): void {
    if (this.text == '') throw new Error('Text can not be empty.');
  }

  get type(): NoteTypes {
    if (+this.marker % 1 > 0) return NoteTypes.Video;
    return NoteTypes.Pdf;
  }
}
