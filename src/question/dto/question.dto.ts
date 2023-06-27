import { Label } from '../../label';
import { Category } from '../../category';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

class LabelDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class QuestionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  @Type(() => Category)
  @Transform(({ value }) => plainToInstance(CategoryDto, value))
  category: CategoryDto;

  @ApiProperty({ isArray: true, type: LabelDto })
  @Type(() => Label)
  @Transform(({ value }) => plainToInstance(LabelDto, value))
  labels: LabelDto[];
}
