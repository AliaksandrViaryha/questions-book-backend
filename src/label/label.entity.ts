import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category';
import { Question } from '../question';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @ManyToOne(() => Category, (category) => category.labels, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  category: Category;

  @ManyToMany(() => Question, (question) => question.labels)
  questions: Promise<Question[]>;
}
