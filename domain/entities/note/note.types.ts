export interface INote extends INoteData {
  validate(): void;
  type: NoteTypes;
}

export interface INoteData {
  id?: string;
  text: string;
  marker: string;
}

export enum NoteTypes {
  Pdf = 'pdf',
  Video = 'video',
}
