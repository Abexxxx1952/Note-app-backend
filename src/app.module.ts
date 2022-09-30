import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NoteModule } from "./note/note.module";
import { TypeOrmModule } from "./db/typeorm.module";
import { ConfigModule } from "./config.module";

@Module({
  imports: [ConfigModule, NoteModule, TypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
