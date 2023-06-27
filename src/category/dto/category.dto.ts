import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CategoryDto {
  @IsNumber()
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly name: string;
}