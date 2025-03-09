import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentEntity } from './comment.model';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './types';

@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {}
  @Mutation(() => CommentEntity)
  addComment(@Args('body') body: CreateCommentDto) {
    return this.commentService.create(body);
  }
}
