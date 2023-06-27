// eslint-disable-next-line max-len
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class HttpException {
  @ApiProperty({ enum: HttpStatus })
  statusCode: ErrorHttpStatusCode;

  @ApiProperty()
  error: string;

  @ApiProperty()
  message: string;
}

export class ValidationException {
  @ApiProperty({ enum: HttpStatus })
  statusCode: ErrorHttpStatusCode;

  @ApiProperty()
  error: string;

  @ApiProperty({ isArray: true, type: String })
  message: string;
}

export type ApiErrorOptions = Omit<ApiResponseOptions, 'type' | 'isArray'>;
export type ApiValidationErrorOptions = Omit<
  ApiResponseOptions,
  'type' | 'isArray'
>;
