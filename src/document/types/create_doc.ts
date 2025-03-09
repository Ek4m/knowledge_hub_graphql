import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { DocEntity } from '../doc.model';

@InputType()
export class CreateDocDto {
  @IsNotEmpty()
  @Field()
  title: string;

  @IsNotEmpty()
  @Field()
  categoryId: string;

  @IsNotEmpty()
  @Field()
  content: string;
}

@InputType()
export class EditDocDto {
  @IsNotEmpty()
  @Field()
  id: string;

  @IsNotEmpty()
  @Field()
  content: string;
}

@ObjectType()
export class SubscriptionResult {
  @Field(() => Int)
  userId: number;

  @Field(() => DocEntity)
  doc: DocEntity;
}
