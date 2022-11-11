import { describe, expect, it } from '@jest/globals';
import { Note, NoteTypes } from './';
import noteData from './mockData/note.json';

describe('note', () => {
  it('noteType with marker = 1', () => {
    noteData.marker = '1';
    const note = new Note(noteData);
    expect(note.type).toEqual(NoteTypes.Pdf);
  });

  it('noteType with marker = 0.11212', () => {
    noteData.marker = '0.11212';
    const note = new Note(noteData);
    expect(note.type).toEqual(NoteTypes.Video);
  });

  it('noteType with marker = 6.23212', () => {
    noteData.marker = '6.23212';
    const note = new Note(noteData);
    expect(note.type).toEqual(NoteTypes.Video);
  });

  it('noteType with marker = 2', () => {
    noteData.marker = '2';
    const note = new Note(noteData);
    expect(note.type).toEqual(NoteTypes.Pdf);
  });
});
