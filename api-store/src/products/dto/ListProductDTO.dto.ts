import { ProductEntity } from '../entities/product.entity';
import { ProductFeatureDTO } from './ProductFeature.dto';
import { ProductImageDTO } from './ProductImage.dto';

export class ListProductDTO {
  id: number;
  userId: number;
  name: string;
  value: number;
  availableQuantity: number;
  description: string;
  features: ProductFeatureDTO[];
  images: ProductImageDTO[];
  category: string;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.userId = productEntity.userId;
    this.name = productEntity.name;
    this.value = productEntity.value ?? 0;
    this.availableQuantity = productEntity.availableQuantity;
    this.description = productEntity.description;
    this.features = productEntity.features;
    this.images = productEntity.images;
    this.category = productEntity.category;
  }
}
