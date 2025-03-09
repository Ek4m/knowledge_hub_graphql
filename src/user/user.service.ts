import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './user.model';
import { SignInDto } from 'src/auth/types/signin';
import { Encryption } from 'src/common/encryption';
import { CreateUserDto } from './types/create_user';
import { ProfileEntity } from 'src/profile/profile.model';

@Injectable()
export class UserService {
  async byId(id: number) {
    const user = await UserEntity.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: ProfileEntity, attributes: ['firstName', 'lastName'] },
      ],
    });
    return user;
  }

  findAll() {
    return UserEntity.findAll();
  }

  async create(body: CreateUserDto) {
    const exists = await UserEntity.findOne({ where: { email: body.email } });
    if (exists)
      throw new BadRequestException({ message: 'User already exists' });
    const newUser = await UserEntity.create(body as any);
    return newUser;
  }

  async login(body: SignInDto): Promise<UserEntity> {
    const user = await UserEntity.findOne({ where: { email: body.email } });
    if (!user) throw new BadRequestException("User doesn't exist");
    const validate = Encryption.validate(body.password, user.password!);
    if (!validate) throw new BadRequestException('Invalid credentials');
    return user;
  }
}
