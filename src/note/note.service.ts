import { Injectable, BadRequestException } from "@nestjs/common";
import { Categories } from "./types/categories";
import { NoteEntity, NoteEditEntity } from "./types/note.entity";
import { StatsEntity } from "./types/stats.entity";
import { createNoteDto } from "../note/dto/createNote.dto";

import { db } from "../db/db";

@Injectable()
export class NoteService {
  async getActiveNotes(): Promise<NoteEntity[]> {
    const activeTask = await db.activeTask;

    return activeTask;
  }

  async getArchiveNotes(): Promise<NoteEntity[]> {
    const archivedTask = await db.archivedTask;

    return archivedTask;
  }
  async getActiveNoteById(id: number): Promise<NoteEntity> {
    const note = await db.activeTask.find((elem) => {
      return elem.id === id;
    });
    if (note) {
      return note;
    }

    throw new BadRequestException();
  }
  async getArchivedNoteById(id: number): Promise<NoteEntity> {
    const note = await db.archivedTask.find((elem) => {
      return elem.id === id;
    });
    if (note) {
      return note;
    }

    throw new BadRequestException();
  }
  async getStats(): Promise<StatsEntity[]> {
    const stats = await Object.values(Categories).map((elem) => {
      const activeTaskValue = db.activeTask.filter(
        (filterElem) => filterElem.category === elem
      ).length;

      const archivedTaskValue = db.archivedTask.filter(
        (filterElem) => filterElem.category === elem
      ).length;

      return {
        categories: elem,
        active: activeTaskValue,
        archived: archivedTaskValue,
      };
    });

    return stats;
  }
  async createNote(note: createNoteDto): Promise<NoteEntity> {
    if (note) {
      const newNote = {
        id: Math.random() * Math.pow(10, 16),
        name: note.name,
        creation_time: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        category: note.category,
        content: note.content,
        dates: this.TransformDates(note.dates),
      };

      const dbRes = await db.activeTask.push(newNote);

      return db.activeTask[dbRes - 1];
    }
    /*  throw new BadRequestException(); */
  }
  async deleteActiveNote(id: number): Promise<NoteEntity> {
    const NoteIndex = await db.activeTask.findIndex((elem) => elem.id === id);
    const deletedNote = await db.activeTask.splice(NoteIndex, 1)[0];

    return deletedNote;
  }
  async deleteArchivedNote(id: number): Promise<NoteEntity> {
    const NoteIndex = await db.archivedTask.findIndex((elem) => elem.id === id);
    const deletedNote = await db.archivedTask.splice(NoteIndex, 1)[0];

    return deletedNote;
  }
  async editActiveNote(
    id: number,
    note: NoteEditEntity
  ): Promise<NoteEntity[]> {
    const NoteIndex = await db.activeTask.findIndex((elem) => elem.id === id);

    let editedNote = {
      id: db.activeTask[NoteIndex].id,
      name: note.name || db.activeTask[NoteIndex].name,
      creation_time: db.activeTask[NoteIndex].creation_time,
      category: note.category || db.activeTask[NoteIndex].category,
      content: note.content || db.activeTask[NoteIndex].content,
      dates:
        (note.dates && this.TransformDates(note.dates)) ||
        db.activeTask[NoteIndex].dates,
    };

    const oldNote = await db.activeTask.splice(NoteIndex, 1, editedNote)[0];

    return [oldNote, editedNote];
  }

  private TransformDates(dates: string): string {
    return Array.from(dates.matchAll(/\d{1,2}\/\d{1,2}\/\d{2,4}/g)).join(", ");
  }
}
