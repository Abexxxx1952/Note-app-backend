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
import { ApiBody, ApiTags, ApiResponse, ApiParam } from "@nestjs/swagger";
import { NoteService } from "./note.service";
import { ActiveNoteEntity } from "./entity/activeNote.entity";
import { ArchivedNoteEntity } from "./entity/archivedNote.entity";
import { Stats } from "./types/stats";
import { createNoteDto } from "./dto/createNote.dto";
import { NoteEditDto } from "./dto/NoteEdit.dto";
import { NotFoundResponse, BadRequest } from "./types/notFoundResponse";

@ApiTags("Notes")
@Controller("api/v1/notes")
export class NoteController {
  constructor(private readonly appService: NoteService) {}

  @Get("activeNotes")
  @ApiResponse({
    status: 200,
    description: "Get all active notes",
    type: [ActiveNoteEntity],
  })
  @ApiResponse({
    status: 404,
    description: "Not Found",
    type: NotFoundResponse,
  })
  async getActiveNotes(): Promise<ActiveNoteEntity[]> {
    return await this.appService.getActiveNotes();
  }
  /*   ------------------------------------------------------------------- */
  @Get("archivedNotes")
  @ApiResponse({
    status: 200,
    description: "Get all archived notes",
    type: [ArchivedNoteEntity],
  })
  @ApiResponse({
    status: 404,
    description: "Not Found",
    type: NotFoundResponse,
  })
  async getArchivedNotes(): Promise<ArchivedNoteEntity[]> {
    return await this.appService.getArchiveNotes();
  }
  /*   ------------------------------------------------------------------- */
  @Get("activeNote/:id")
  @ApiParam({ name: "id", type: String, required: true })
  @ApiResponse({
    status: 200,
    description: "Get active notes by ID",
    type: ActiveNoteEntity,
  })
  @ApiResponse({
    status: 400,
    description: "Not Found",
    type: BadRequest,
  })
  @UsePipes(ParseIntPipe)
  async getActiveNoteById(@Param("id") id: number): Promise<ActiveNoteEntity> {
    return await this.appService.getActiveNoteById(id);
  }
  /*   ------------------------------------------------------------------- */
  @Get("archivedNote/:id")
  @ApiParam({ name: "id", type: String, required: true })
  @ApiResponse({
    status: 200,
    description: "Get archived notes by ID",
    type: ArchivedNoteEntity,
  })
  @ApiResponse({
    status: 400,
    description: "Not Found",
    type: BadRequest,
  })
  @UsePipes(ParseIntPipe)
  async getArchivedNoteById(
    @Param("id") id: number
  ): Promise<ArchivedNoteEntity> {
    return await this.appService.getArchivedNoteById(id);
  }
  /*   ------------------------------------------------------------------- */
  @Get("stats")
  @ApiResponse({
    status: 200,
    description: "Get note stats",
    type: [Stats],
  })
  @ApiResponse({
    status: 404,
    description: "Not Found",
    type: NotFoundResponse,
  })
  async getNotesStats(): Promise<Stats[]> {
    return await this.appService.getStats();
  }
  /*   ------------------------------------------------------------------- */
  @Post("")
  @ApiResponse({
    status: 201,
    description: "Post note",
    type: ActiveNoteEntity,
  })
  @ApiResponse({
    status: 400,
    description: "Whats wrong description",
    type: BadRequest,
  })
  @ApiBody({ type: [createNoteDto] })
  async createNote(
    @Body(new ValidationPipe()) note: createNoteDto
  ): Promise<ActiveNoteEntity> {
    return await this.appService.createNote(note);
  }
  /*   ------------------------------------------------------------------- */
  @Delete("activeNote/:id")
  @ApiParam({ name: "id", type: String, required: true })
  @ApiResponse({
    status: 200,
    description: "Delete active note by ID",
    type: ActiveNoteEntity,
  })
  @ApiResponse({
    status: 400,
    description: "Not Found",
    type: BadRequest,
  })
  @UsePipes(ParseIntPipe)
  async deleteActiveNote(@Param("id") id: number): Promise<ActiveNoteEntity> {
    return await this.appService.deleteActiveNote(id);
  }
  /*   ------------------------------------------------------------------- */
  @Delete("archivedNote/:id")
  @ApiParam({ name: "id", type: String, required: true })
  @ApiResponse({
    status: 200,
    description: "Delete archived note by ID",
    type: ArchivedNoteEntity,
  })
  @ApiResponse({
    status: 400,
    description: "Not Found",
    type: BadRequest,
  })
  @UsePipes(ParseIntPipe)
  async deleteArchivedNote(
    @Param("id") id: number
  ): Promise<ArchivedNoteEntity> {
    return await this.appService.deleteArchivedNote(id);
  }
  /*   ------------------------------------------------------------------- */
  @Patch("activeNote/:id")
  @ApiParam({ name: "id", type: String, required: true })
  @ApiResponse({
    status: 200,
    description: "Edit active note",
    type: [ActiveNoteEntity],
  })
  @ApiResponse({
    status: 400,
    description: "Error message",
    type: BadRequest,
  })
  @ApiBody({
    type: NoteEditDto,
  })
  async editActiveNote(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    note: NoteEditDto
  ): Promise<ActiveNoteEntity[]> {
    return await this.appService.editActiveNote(id, note);
  }
}
