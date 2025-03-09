import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards, ValidationPipe } from '@nestjs/common';

import { SignInDto, SignInResult } from './types/signin';
import { UserEntity } from 'src/user/user.model';
import { AuthService } from './auth.service';
import { SignUpDto } from './types/signup';
import { GqlAuthGuard } from './jwt.guard';
import { CurrentUser } from './decorators/current_user';
import { ProfileService } from 'src/profile/profile.service';
import { RefreshDto, RefreshResult } from './types/refresh';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
  ) {}

  @Query(() => UserEntity, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: UserEntity) {
    const profile = await this.profileService.byUser(user.id);
    user.profile = profile!;
    return user;
  }

  @Mutation(() => UserEntity)
  signUp(@Args('body', new ValidationPipe()) body: SignUpDto) {
    const result = this.authService.create(body);
    return result;
  }

  @Mutation(() => SignInResult)
  async signIn(@Args('body', new ValidationPipe()) body: SignInDto) {
    const result = await this.authService.login(body);
    return result;
  }

  @Mutation(() => RefreshResult)
  refresh(@Args('body', new ValidationPipe()) body: RefreshDto) {
    return this.authService.refresh(body);
  }
}
