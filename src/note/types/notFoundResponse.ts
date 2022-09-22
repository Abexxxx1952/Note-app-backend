import { ApiProperty } from "@nestjs/swagger";

export class NotFoundResponse {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
}
export class BadRequest {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
