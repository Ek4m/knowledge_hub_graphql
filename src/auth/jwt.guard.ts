import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/user/user.model';
import { ROLES_KEY } from './constants';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isValidated = (await super.canActivate(context)) as boolean;
    if (!isValidated) return false;
    const ctx = GqlExecutionContext.create(context);
    const user: UserEntity = ctx.getContext().req.user;
    const roles = this.reflector.get(ROLES_KEY, ctx.getHandler());
    if (!roles || !roles.length) return isValidated;
    return roles.includes(user.role);
  }
}
