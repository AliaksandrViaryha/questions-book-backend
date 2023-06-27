import { DataSource } from 'typeorm';
import { config } from './config';

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.get<string>('DB_HOST'),
  port: config.get<number>('DB_PORT'),
  username: config.get<string>('DB_USER'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_NAME'),
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  migrations: ['src/database/migrations/*{.js,.ts}'],
  useUTC: true,
  migrationsRun: false,
  synchronize: false,
});
