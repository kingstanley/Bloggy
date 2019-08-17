import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  // port: 3600,
  // username: 'postgres',
  // password: 'Nj63912@',
  username: "root",
  password: "",
  charset: "utf8",
  database: "sdc",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: true
};
