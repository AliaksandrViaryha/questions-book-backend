import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Min } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({ minLength: 1, maxLength: 250 })
  @IsString()
  @Length(1, 250)
  title: string;

  @ApiProperty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  rating: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  categoryId: number;

  @ApiProperty({ isArray: true, type: Number })
  @IsInt({ each: true })
  @Min(1, { each: true })
  labelIds: number[];
}
