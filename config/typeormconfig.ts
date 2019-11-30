import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',

  // host:'209.205.209.130',
  port: 3306,
  
  username: 'root',
  password: '',
  // password: 'Nj63912@',
  // username: 'standevc_bloggy',
  // password: 'StanDevCode2019',
  charset: 'utf8',
  
  database: 'sdc',
  // database: 'standevc_sdc',
   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, 
};
