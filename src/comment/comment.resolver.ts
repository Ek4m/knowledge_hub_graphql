import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { CommentEntity } from './comment.model';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './types';
import { COMMENT_ADDED } from './subscriptions';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/current_user';
import { UserEntity } from 'src/user/user.model';

const pubSub = new PubSub();

@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommentEntity)
  async addComment(
    @Args('body') body: CreateCommentDto,
    @CurrentUser() user: UserEntity,
  ) {
    const comment = await this.commentService.create(body, user.id);
    comment.user = user;
    await pubSub.publish(COMMENT_ADDED, {
      [COMMENT_ADDED]: comment,
    });
    return comment;
  }

  @Query(() => [CommentEntity], { nullable: true })
  async getComments(@Args('docId') docId: string) {
    const comments = await this.commentService.getCommentByDoc(docId);
    console.log('SAAAA_______', comments[0].user);
    console.log('PROFILE_______', comments[0].user.profile);
    return comments;
  }

  @Subscription(() => CommentEntity, {
    filter(payload, variables) {
      return payload[COMMENT_ADDED].docId === variables.docId;
    },
  })
  [COMMENT_ADDED](@Args('docId') docId: string) {
    console.log('Adding comment to document - ', docId);
    return pubSub.asyncIterableIterator(COMMENT_ADDED);
  }
}
