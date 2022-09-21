import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
  UsePipes,
  ParseIntPipe,
  ValidationPipe,
} from "@nestjs/common";
import { NoteService } from "./note.service";
import { NoteEntity } from "./types/note.entity";
import { StatsEntity } from "./types/stats.entity";
import { createNoteDto } from "./dto/createNote.dto";

@Controller("api/v1/note")
export class NoteController {
  constructor(private readonly appService: NoteService) {}

  @Get("activeNotes")
  async getActiveNotes(): Promise<NoteEntity[]> {
    return await this.appService.getActiveNotes();
  }
  @Get("archivedNotes")
  async getArchivedNotes(): Promise<NoteEntity[]> {
    return await this.appService.getArchiveNotes();
  }
  @Get("activeNote/:id")
  @UsePipes(ParseIntPipe)
  async getActiveNoteById(@Param("id") id: number): Promise<NoteEntity> {
    return await this.appService.getActiveNoteById(id);
  }
  @Get("archivedNote/:id")
  @UsePipes(ParseIntPipe)
  async getArchivedNoteById(@Param("id") id: number): Promise<NoteEntity> {
    return await this.appService.getArchivedNoteById(id);
  }
  @Get("stats")
  async getNotesStats(): Promise<StatsEntity[]> {
    return await this.appService.getStats();
  }
  @Post("")
  async createNote(
    @Body(new ValidationPipe()) note: createNoteDto
  ): Promise<NoteEntity> {
    return await this.appService.createNote(note);
  }
  @Delete("activeNote/:id")
  @UsePipes(ParseIntPipe)
  async deleteActiveNote(@Param("id") id: number): Promise<NoteEntity> {
    return await this.appService.deleteActiveNote(id);
  }
  @Delete("archivedNote/:id")
  @UsePipes(ParseIntPipe)
  async deleteArchivedNote(@Param("id") id: number): Promise<NoteEntity> {
    return await this.appService.deleteArchivedNote(id);
  }
  @Patch("activeNote/:id")
  async editActiveNote(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe()) note: NoteEntity
  ): Promise<NoteEntity[]> {
    return await this.appService.editActiveNote(id, note);
  }
}
