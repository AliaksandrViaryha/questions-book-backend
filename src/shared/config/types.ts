import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export class EnvironmentVariables {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  PORT: number;

  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  DB_PORT: number;

  @IsBoolean()
  @Type(() => String)
  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  SSL: boolean;

  @ValidateIf((object) => object.SSL)
  @IsString()
  SSL_PRIVATE_KEY_PATH: string;

  @ValidateIf((object) => object.SSL)
  @IsString()
  SSL_CERT_PATH: string;

  @ValidateIf((object) => object.SSL)
  @IsString()
  ALLOWED_ORIGIN: string;
}

export abstract class IConfig<T extends Record<never, never>> {
  abstract get<U extends T[keyof T]>(key: keyof T): U;
  abstract isDev(): boolean;
  abstract SSL(): boolean;
}
