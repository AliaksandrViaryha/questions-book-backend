import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryDto,
} from './dto';
import { ListDto } from '../shared/';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(category: CreateCategoryDto): Promise<CategoryDto> {
    const newCategory = await this.categoryRepository.save(plainToInstance(Category, category));
    return plainToInstance(CategoryDto, newCategory);
  }
  
  async deleteById(id: number): Promise<void> {
    const deletedCategory = await this.categoryRepository.delete(id);
    if (!deletedCategory.affected) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  async update(
    id: number,
    updateCategory: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    await this.categoryRepository.update(id, plainToInstance(Category, updateCategory));
    const updatedCategory = await this.getById(id);
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ${id} not found`);
    }
    return plainToInstance(CategoryDto, updatedCategory);
  }

  async getAll(): Promise<ListDto<CategoryDto>> {
    const categories = await this.categoryRepository.find();
    const transformedCategories = categories.map((category) =>
      plainToInstance(CategoryDto, category),
    );
    return new ListDto<CategoryDto>(transformedCategories);
  }

  async getById(id: number): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ${id} not found`);
    }

    return plainToInstance(CategoryDto, category);
  }
}
