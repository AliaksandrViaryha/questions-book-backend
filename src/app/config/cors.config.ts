// eslint-disable-next-line max-len
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { config } from '../../shared';

export const corsOptions: CorsOptions = {
  origin: config.get<string>('ALLOWED_ORIGIN'),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
