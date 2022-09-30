import { IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { Categories } from "../types/categories";

export class NoteEditDto {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  category?: Categories;

  @ApiProperty()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsString()
  dates?: string;
}
