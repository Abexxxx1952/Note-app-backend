import { Categories } from "./categories";
import { ApiProperty } from "@nestjs/swagger";

export class Stats {
  @ApiProperty()
  categories: Categories;
  @ApiProperty()
  active: number;
  @ApiProperty()
  archived: number;
}
