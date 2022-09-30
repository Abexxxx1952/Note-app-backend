import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categories } from "./types/categories";
import { ActiveNoteEntity } from "./entity/activeNote.entity";
import { ArchivedNoteEntity } from "./entity/archivedNote.entity";
import { Stats } from "./types/stats";
import { createNoteDto } from "../note/dto/createNote.dto";
import { NoteEditDto } from "./dto/NoteEdit.dto";

import { db } from "../db/db";

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(ActiveNoteEntity)
    private readonly activeNoteRepository: Repository<ActiveNoteEntity>,
    @InjectRepository(ArchivedNoteEntity)
    private readonly archivedNoteRepository: Repository<ArchivedNoteEntity>
  ) {}
  /*   ----------------------Get All ActiveNote--------------------------------------------- */
  async getActiveNotes(): Promise<ActiveNoteEntity[]> {
    const activeTask = await this.activeNoteRepository.find();

    return activeTask;
  }
  /*   ----------------------Get All ArchivedNote--------------------------------------------- */
  async getArchiveNotes(): Promise<ArchivedNoteEntity[]> {
    const archivedTask = await this.archivedNoteRepository.find();

    return archivedTask;
  }

  /*   ----------------------Get ActiveNote by ID--------------------------------------------- */
  async getActiveNoteById(id: number): Promise<ActiveNoteEntity> {
    const note = await this.activeNoteRepository.findOneBy({
      id,
    });
    if (note) {
      return note;
    }

    throw new BadRequestException();
  }

  /*   ----------------------Get ArchivedNote by ID--------------------------------------------- */
  async getArchivedNoteById(id: number): Promise<ArchivedNoteEntity> {
    const note = await this.archivedNoteRepository.findOneBy({
      id,
    });
    if (note) {
      return note;
    }

    throw new BadRequestException();
  }

  /*   ----------------------Get Stats --------------------------------------------- */
  async getStats(): Promise<Stats[]> {
    const categoriesArr = Object.values(Categories);
    const stats = await Promise.all(
      categoriesArr.map(async (elem) => {
        const activeTaskValue = await this.activeNoteRepository.count({
          where: {
            category: elem,
          },
        });

        const archivedTaskValue = await this.archivedNoteRepository.count({
          where: {
            category: elem,
          },
        });

        return {
          categories: elem,
          active: activeTaskValue,
          archived: archivedTaskValue,
        };
      })
    );

    return stats;
  }

  /*   ----------------------Create new ActiveNote--------------------------------------------- */
  async createNote(note: createNoteDto): Promise<ActiveNoteEntity> {
    const newNote = {
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

    const newNoteRes = await this.activeNoteRepository.create(newNote);
    const res = await this.activeNoteRepository.save(newNoteRes);
    return res;
  }
  /*   ----------------------Delete ActiveNote--------------------------------------------- */
  async deleteActiveNote(id: number): Promise<ActiveNoteEntity> {
    const deletedNote = await this.activeNoteRepository.findOneBy({
      id,
    });
    let result;
    if (deletedNote) {
      result = await this.activeNoteRepository.delete(id);
    }
    if (result) return deletedNote;
  }
  /*   ----------------------Delete ArchivedNote--------------------------------------------- */
  async deleteArchivedNote(id: number): Promise<ArchivedNoteEntity> {
    const deletedNote = await this.archivedNoteRepository.findOneBy({
      id,
    });
    let result;
    if (deletedNote) {
      result = await this.activeNoteRepository.delete(id);
    }
    if (result) return deletedNote;
  }
  /*   ----------------------Edit existing ActiveNote--------------------------------------------- */
  async editActiveNote(
    id: number,
    note: NoteEditDto
  ): Promise<ActiveNoteEntity[]> {
    const oldNote = await this.activeNoteRepository.findOneBy({
      id,
    });

    if (note.dates) {
      note.dates = this.TransformDates(note.dates);
    }
    let result;

    if (oldNote) {
      result = await this.activeNoteRepository.update(id, { ...note });
    }

    if (result) {
      const editedNote = await this.activeNoteRepository.findOneBy({
        id,
      });
      return [oldNote, editedNote];
    }
  }

  private TransformDates(dates: string): string {
    return Array.from(dates.matchAll(/\d{1,2}\/\d{1,2}\/\d{2,4}/g)).join(", ");
  }
}
