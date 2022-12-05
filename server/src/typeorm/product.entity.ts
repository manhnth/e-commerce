import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  imgUrl: string;

  @Column()
  inventory: number;

  @Column()
  createAt: Date;

  @Column()
  updateAt: Date;

  @ManyToOne((type) => Category, (category) => category.products)
  category: Category;
}
