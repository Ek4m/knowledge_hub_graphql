import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './types';
import { CommentEntity } from './comment.model';
import { UserEntity } from 'src/user/user.model';
import { ProfileEntity } from 'src/profile/profile.model';

@Injectable()
export class CommentService {
  async create(body: CreateCommentDto, userId: number) {
    const newComment = await CommentEntity.create({ ...body, userId } as any);
    return newComment;
  }

  getCommentByDoc(docId: string) {
    return CommentEntity.findAll({
      where: { docId },
      include: [
        {
          model: UserEntity,
          include: [
            { model: ProfileEntity, attributes: ['firstName', 'lastName'] },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }
}
