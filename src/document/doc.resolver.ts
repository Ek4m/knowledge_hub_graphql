import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import {
  CreateDocDto,
  EditDocDto,
  SubscriptionResult,
} from './types/create_doc';
import { DocService } from './doc.service';
import { DocEntity } from './doc.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/current_user';
import { UserEntity } from 'src/user/user.model';
import { PubSub } from 'graphql-subscriptions';
import { DOCUMENT_EDITED } from './subscriptions';

const pubSub = new PubSub();
@Resolver()
export class DocResolver {
  constructor(private docService: DocService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DocEntity)
  async createDoc(
    @Args('body') body: CreateDocDto,
    @CurrentUser() user: UserEntity,
  ) {
    const newDoc = await this.docService.create(body, user.id);
    return newDoc;
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [DocEntity], { nullable: true })
  myDocs(@CurrentUser() user: UserEntity) {
    const newDoc = this.docService.getDocs({
      userId: user.id.toString(),
    });
    return newDoc;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [DocEntity], { nullable: true })
  getDocs() {
    return this.docService.getDocs();
  }

  @Query(() => DocEntity, { nullable: true })
  docDetails(@Args('id', { type: () => String }) id: number) {
    return this.docService.getDoc(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SubscriptionResult)
  async editDoc(
    @Args('body') body: EditDocDto,
    @CurrentUser() user: UserEntity,
  ) {
    const doc = await this.docService.editDoc(body.id, body.content);
    const result = { doc, userId: user.id };
    await pubSub.publish(DOCUMENT_EDITED, {
      [DOCUMENT_EDITED]: result,
    });
    return result;
  }

  @Subscription(() => SubscriptionResult, {
    name: DOCUMENT_EDITED,
    filter(payload, variables) {
      return variables.userId !== payload[DOCUMENT_EDITED].userId;
    },
  })
  [DOCUMENT_EDITED](@Args('userId', { type: () => Int }) userId: number) {
    console.log('RETURNING CHANGES WITH ', userId);
    return pubSub.asyncIterableIterator(DOCUMENT_EDITED);
  }
}
