import * as fs from 'fs';
import { config } from '../../shared';
// eslint-disable-next-line max-len
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

export const readHttpsOptions = (): HttpsOptions => ({
  key: fs.readFileSync(config.get<string>('SSL_PRIVATE_KEY_PATH')),
  cert: fs.readFileSync(config.get<string>('SSL_CERT_PATH')),
});
