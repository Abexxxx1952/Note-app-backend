import { Categories } from "../types/categories";
import { IsString, IsNotEmpty } from "class-validator";

export class createNoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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
