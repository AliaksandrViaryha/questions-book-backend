import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../question';
import { Label } from '../label';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @OneToMany(() => Question, (question) => question.category)
  questions: Promise<Question[]>;

  @OneToMany(() => Label, (label) => label.category)
  labels: Promise<Label[]>;
}
