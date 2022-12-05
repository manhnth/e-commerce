import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';

export enum Categories {
  NHIET_KE = 'Nhiet ke',
  MAY_DO_HUYET_AP = 'jkajrnw',
  MAY_DO_DUONG_HUYET = 'wera',
  MAY_XONG_KHI_DUNG = 'aaaw',
  THIET_BI_Y_TE_KHAC = 'xppp',
  DUNG_CU_KIEM_TRA = 'eergga',
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Categories,
    default: Categories.THIET_BI_Y_TE_KHAC,
  })
  name: Categories;

  @Column()
  description: string;

  @Column()
  imgUrl: string;

  @OneToMany((type) => Product, (products) => products.category)
  products: Product[];
}
