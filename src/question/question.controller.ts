import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QuestionDto, CreateQuestionDto, UpdateQuestionDto } from './dto';
import {
  ApiErrorResponse,
  ApiValidationErrorResponse,
  ApiNotFoundErrorResponse,
  IntIdParam,
} from '../shared/';

@ApiTags('Questions')
@ApiValidationErrorResponse()
@ApiErrorResponse({ status: 500 })
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(':id')
  @ApiOkResponse({
    type: QuestionDto,
    description: 'Retrieves question by Id',
  })
  @ApiNotFoundErrorResponse()
  async getById(@IntIdParam() id: number): Promise<QuestionDto> {
    return this.questionService.getById(id);
  }

  @Post()
  @ApiOkResponse({ type: QuestionDto })
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<QuestionDto> {
    return this.questionService.create(createQuestionDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundErrorResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@IntIdParam() id: number): Promise<void> {
    await this.questionService.deleteById(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: QuestionDto,
    description: 'Updates question by Id',
  })
  @ApiNotFoundErrorResponse()
  updateById(
    @IntIdParam() id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionDto> {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Post(':id/change-rating')
  @HttpCode(200)
  @ApiOkResponse({ type: QuestionDto })
  @ApiNotFoundErrorResponse()
  changeRating(
    @IntIdParam() id: number,
    @Query('change', ParseIntPipe) valueChange: number,
  ): Promise<QuestionDto> {
    return this.questionService.changeRatingBy(id, valueChange);
  }
}
