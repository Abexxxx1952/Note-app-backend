import { Module } from "@nestjs/common";
import { TypeOrmModule as NestTypeOrmModule } from "@nestjs/typeorm";

import config from "./ormconfig";

@Module({
  imports: [NestTypeOrmModule.forRoot(config)],
})
export class TypeOrmModule {}
