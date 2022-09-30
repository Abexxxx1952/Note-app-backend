import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "../types/categories";

import { ApiProperty } from "@nestjs/swagger";

@Entity("ActiveNoteEntity")
export class ActiveNoteEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar" })
  name: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  creation_time: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  category: Categories;

  @ApiProperty()
  @Column({ type: "varchar" })
  content: string;

  @ApiProperty()
  @Column({ type: "varchar" })
  dates: string;
}
