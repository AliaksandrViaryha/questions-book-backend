import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  ApiErrorOptions,
  ApiValidationErrorOptions,
  HttpException,
  ValidationException,
} from './types';

export const ApiErrorResponse = (
  options: ApiErrorOptions = { status: '4XX' },
) =>
  applyDecorators(
    ApiResponse({ type: HttpException, isArray: false, ...options }),
  );

export const ApiNotFoundErrorResponse = (
  options: Omit<ApiValidationErrorOptions, 'status'> = {},
) => applyDecorators(ApiErrorResponse({ status: 404, ...options }));

export const ApiValidationErrorResponse = (
  options: ApiValidationErrorOptions = { status: 400 },
) =>
  applyDecorators(
    ApiResponse({
      type: ValidationException,
      isArray: false,
      description: 'Provided data did not conform to existing constraints',
      ...options,
    }),
  );
