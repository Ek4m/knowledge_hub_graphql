import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './types';
import { CommentEntity } from './comment.model';

@Injectable()
export class CommentService {
  async create(body: CreateCommentDto) {
    const newComment = await CommentEntity.create(body as any);
    return newComment;
  }

  getCommentByDoc(docId: string) {
    return CommentEntity.findAll({ where: { docId } });
  }
}
