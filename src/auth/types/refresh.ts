import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RefreshDto {
  @IsNotEmpty()
  @Field()
  refreshToken: string;
}

@ObjectType()
export class RefreshResult {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}
