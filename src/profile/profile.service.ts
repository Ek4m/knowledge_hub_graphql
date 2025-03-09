import { Injectable } from '@nestjs/common';
import { ProfileEntity } from './profile.model';
import { AddProfileDto } from './types/add_profile';

@Injectable()
export class ProfileService {
  async byUser(id: number) {
    return ProfileEntity.findOne({ where: { userId: id } });
  }

  async addProfile(body: AddProfileDto) {
    const newProfile = await ProfileEntity.create(body as any);
    return newProfile;
  }
}
