import { Module } from '@nestjs/common';
import { DocService } from './doc.service';
import { DocResolver } from './doc.resolver';

@Module({
  providers: [DocService, DocResolver],
})
export class DocModule {}
