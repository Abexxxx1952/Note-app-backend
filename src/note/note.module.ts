import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoteController } from "./note.controller";
import { NoteService } from "./note.service";
import { ActiveNoteEntity } from "./entity/activeNote.entity";
import { ArchivedNoteEntity } from "./entity/archivedNote.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ActiveNoteEntity, ArchivedNoteEntity])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
