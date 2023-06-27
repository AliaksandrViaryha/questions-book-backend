import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto, CategoryDto } from './dto';
import {
  IntIdParam,
  ListDto,
  ApiListResponse,
  ApiErrorResponse,
  ApiNotFoundErrorResponse,
  ApiValidationErrorResponse,
} from '../shared/';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Category')
@ApiValidationErrorResponse()
@ApiErrorResponse({ status: 500 })
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOkResponse({ type: CategoryDto })
  create(@Body() createCategoryDto: CategoryDto): Promise<CategoryDto> {
    return this.categoryService.create(createCategoryDto);
  }
  @Get()
  @ApiListResponse(CategoryDto)
  getAll(): Promise<ListDto<CategoryDto>> {
    return this.categoryService.getAll();
  }
  @Get(':id')
  @ApiNotFoundErrorResponse()
  @ApiOkResponse({
    status: 200,
    type: CategoryDto,
    description: 'Retrieves category by Id',
  })
  getById(@IntIdParam() id: number): Promise<CategoryDto> {
    return this.categoryService.getById(id);
  }
  @Patch(':id')
  @ApiOkResponse({
    type: CategoryDto,
  })
  @ApiNotFoundErrorResponse()
  async update(
    @IntIdParam() id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoryService.update(id, updateCategoryDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundErrorResponse()
  delete(@IntIdParam() id: number): Promise<void> {
    return this.categoryService.deleteById(id);
  }
}
