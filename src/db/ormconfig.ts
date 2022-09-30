import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
  type: "postgres",
  host: "postgresql",
  port: 5432,
  username: "admin",
  password: "root",
  database: "NoteAppDB3",
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true,
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
};

export default config;
