import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Question } from './question.entity';
import { QuestionDto, UpdateQuestionDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { CreateQuestionDto } from './dto';
import { Label } from '../label';
import { EntityNotFoundException, mapIdsToInstances } from '../shared';

@Injectable()
export class QuestionService {
  private readonly questionRepository: Repository<Question>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.questionRepository = dataSource.getRepository(Question);
  }

  async getById(id: number): Promise<QuestionDto> {
    const question = await this.questionRepository.findOne({
      where: {
        id,
      },
      relations: ['labels', 'category'],
    });
    if (!question) throw new EntityNotFoundException(Question, id);
    return plainToInstance(QuestionDto, question);
  }

  async deleteById(id: number): Promise<void> {
    const deleteResult = await this.questionRepository.delete(id);
    if (!deleteResult.affected) throw new EntityNotFoundException(Question, id);
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<QuestionDto> {
    const question = plainToInstance(Question, createQuestionDto);
    question.labels = mapIdsToInstances(Label, createQuestionDto.labelIds);

    const insertedQuestion = await this.questionRepository.save(question);
    const createdQuestion = await this.questionRepository.findOne({
      where: {
        id: insertedQuestion.id,
      },
      relations: ['labels', 'category'],
    });
    if (!createdQuestion) throw new InternalServerErrorException();

    return plainToInstance(QuestionDto, createdQuestion);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = plainToInstance(Question, updateQuestionDto);
    question.id = id;
    if (updateQuestionDto.labelIds)
      question.labels = mapIdsToInstances(Label, updateQuestionDto.labelIds);

    const preloaded = await this.questionRepository.preload(question);
    if (!preloaded) throw new EntityNotFoundException(Question, id);
    const saved = await this.questionRepository.save(preloaded);

    const updatedQuestion = await this.questionRepository.findOne({
      where: {
        id: saved.id,
      },
      relations: ['labels', 'category'],
    });
    if (!updatedQuestion) throw new EntityNotFoundException(Question, id);

    return plainToInstance(QuestionDto, updatedQuestion);
  }

  async changeRatingBy(id: number, value: number): Promise<QuestionDto> {
    const updateResult = await this.questionRepository
      .createQueryBuilder()
      .update()
      .set({
        rating: () =>
          `CASE WHEN rating + :value < 0 THEN 0 ELSE rating + :value END`,
      })
      .setParameter('value', value)
      .where('id = :id', { id })
      .execute();
    if (!updateResult.affected) throw new EntityNotFoundException(Question, id);

    const updatedQuestion = await this.questionRepository.findOne({
      where: {
        id,
      },
      relations: ['labels', 'category'],
    });
    if (!updatedQuestion) throw new EntityNotFoundException(Question, id);

    return plainToInstance(QuestionDto, updatedQuestion);
  }
}
