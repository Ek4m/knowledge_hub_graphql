import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './types/create_category';
import { CategoryEntity } from './category.model';

@Injectable()
export class CategoryService {
  async create(body: CreateCategoryDto, userId: number) {
    const newDoc = await CategoryEntity.create({
      ...body,
      createdBy: userId,
    } as any);
    return newDoc;
  }

  getCategories() {
    return CategoryEntity.findAll();
  }
}
