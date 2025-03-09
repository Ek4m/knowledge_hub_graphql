import { Module } from '@nestjs/common';
import { DbConfig } from './db.provider';

@Module({
  providers: [DbConfig],
})
export class DbModule {}
