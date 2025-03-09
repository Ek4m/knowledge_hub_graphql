import { Injectable } from '@nestjs/common';
import { CreateDocDto } from './types/create_doc';
import { DocEntity } from './doc.model';

@Injectable()
export class DocService {
  async create(body: CreateDocDto, userId: number) {
    const newDoc = await DocEntity.create({ ...body, userId } as any);
    return newDoc;
  }

  getDocs(filter: Record<string, string> = {}) {
    const where: Record<string, string | object> = {};
    if (filter.userId) where.userId = filter.userId;
    return DocEntity.findAll({ where });
  }

  async getDoc(id: number) {
    const doc = await DocEntity.findByPk(id);
    return doc;
  }

  async editDoc(id: string, content: string) {
    const doc = await DocEntity.findByPk(id);
    if (!doc) return;
    doc.content = content;
    await doc.save();
    return doc;
  }
}
