import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "../types/categories";

import { ApiProperty } from "@nestjs/swagger";

@Entity("ArchivedNoteEntity")
export class ArchivedNoteEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: "name", type: "varchar" })
  name: string;

  @ApiProperty()
  @Column({ name: "creation_time", type: "varchar" })
  creation_time: string;

  @ApiProperty()
  @Column({ name: "category", type: "enum", enum: Categories })
  category: string;

  @ApiProperty()
  @Column({ name: "content", type: "varchar" })
  content: string;

  @ApiProperty()
  @Column({ name: "dates", type: "varchar" })
  dates: string;
}
