import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { Environment, EnvironmentVariables, IConfig } from './types';
import { validateConfig } from './lib';

@Injectable()
export class Config implements IConfig<EnvironmentVariables> {
  private parsed: EnvironmentVariables = validateConfig(
    dotenv.config().parsed ?? {},
  );

  get<T extends EnvironmentVariables[keyof EnvironmentVariables]>(
    key: keyof EnvironmentVariables,
  ): T {
    return this.parsed[key] as T;
  }

  isDev(): boolean {
    return this.parsed.NODE_ENV === Environment.Development;
  }

  SSL(): boolean {
    return this.parsed.SSL;
  }
}

export const config = new Config();
