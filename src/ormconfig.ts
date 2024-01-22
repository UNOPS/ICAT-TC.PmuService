import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1997',
  database: 'pmu',




  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  synchronize: false,

  migrationsRun: true,
  logging: true,
  logger: 'file',

  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
};

export = config;
