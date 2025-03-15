import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/user/user.model';

@InputType()
export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;
}

@ObjectType()
export class SignInResult {
  @Field(() => UserEntity)
  user: UserEntity;
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
}
