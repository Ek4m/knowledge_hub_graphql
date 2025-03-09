import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { DocModule } from './document/doc.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    DbModule,
    UserModule,
    AuthModule,
    ProfileModule,
    DocModule,
    CategoryModule,
    CommentModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      autoSchemaFile: path.join(process.cwd(), 'src/graphql.gql'),
      formatError: (error) => ({
        message: error.message,
        extensions: { ...error.extensions, stacktrace: undefined },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
