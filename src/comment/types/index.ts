import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCommentDto {
  @IsNotEmpty()
  @Field()
  content: string;

  @IsNotEmpty()
  @Field()
  docId: string;
}
