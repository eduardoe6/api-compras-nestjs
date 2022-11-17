import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  //ManyToOne,
} from 'typeorm';
//import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  //@ManyToOne(() => Category, (category) => category.id)
  //categoryId: Category;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 400 })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ length: 200 })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
