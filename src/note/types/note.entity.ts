import { Categories } from "./categories";

import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class NoteEntity {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  creation_time: string;

  @IsString()
  @IsNotEmpty()
  category: Categories;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  dates: string;
}
