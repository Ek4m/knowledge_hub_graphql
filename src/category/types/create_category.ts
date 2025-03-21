import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @IsNotEmpty()
  @Field()
  name: string;
}
