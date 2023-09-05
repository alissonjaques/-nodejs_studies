import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_features' })
export class ProductFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 100, nullable: false })
  description: string;
}
