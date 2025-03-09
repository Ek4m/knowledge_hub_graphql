import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants';

export const ForOnly = (...args: number[]) => SetMetadata(ROLES_KEY, args);
