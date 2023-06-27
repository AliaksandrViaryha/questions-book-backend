import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from '../../shared';
import { Category } from '../../category';
import { Label } from '../../label';
import { Question } from '../../question';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.get<string>('DB_HOST'),
  port: config.get<number>('DB_PORT'),
  username: config.get<string>('DB_USER'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_NAME'),
  entities: [Category, Label, Question],
  useUTC: true,
  migrationsRun: false,
  synchronize: false,
};
