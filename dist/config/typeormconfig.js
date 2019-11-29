"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    charset: 'utf8',
    database: 'sdc',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
};
//# sourceMappingURL=typeormconfig.js.map