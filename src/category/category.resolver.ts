import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CategoryService } from './category.service';
import { GqlAuthGuard } from 'src/auth/jwt.guard';
import { CreateCategoryDto } from './types/create_category';
import { CurrentUser } from 'src/auth/decorators/current_user';
import { UserEntity } from 'src/user/user.model';
import { CategoryEntity } from './category.model';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CategoryEntity)
  async createCategory(
    @Args('body') body: CreateCategoryDto,
    @CurrentUser() user: UserEntity,
  ) {
    const newDoc = await this.categoryService.create(body, user.id);
    return newDoc;
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [CategoryEntity], { nullable: true })
  getCategories() {
    return this.categoryService.getCategories();
  }
}
