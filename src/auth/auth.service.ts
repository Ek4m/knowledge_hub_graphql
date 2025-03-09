import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './types/signin';
import { SignUpDto } from './types/signup';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/profile/profile.service';
import { AddProfileDto } from 'src/profile/types/add_profile';
import { CreateUserDto } from 'src/user/types/create_user';
import { RefreshDto } from './types/refresh';
import { DAY_IN_SECONDS, FIVE_DAYS } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private profileService: ProfileService,
  ) {}

  getAll() {
    return this.userService.findAll();
  }

  async create(body: SignUpDto) {
    const userBody: CreateUserDto = {
      email: body.email,
      password: body.password,
    };
    const newUser = await this.userService.create(userBody);
    const profileBody: AddProfileDto = {
      firstName: body.firstName,
      lastName: body.lastName,
      userId: newUser.id,
    };
    await this.profileService.addProfile(profileBody);
    return newUser;
  }

  async login(body: SignInDto) {
    const user = await this.userService.login(body);
    const payload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: DAY_IN_SECONDS }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: FIVE_DAYS }),
    };
  }

  refresh(body: RefreshDto) {
    const payload = this.jwtService.decode(body.refreshToken);
    const accessToken = this.jwtService.sign(
      { id: payload.id },
      {
        expiresIn: FIVE_DAYS,
      },
    );
    return { accessToken, ...body };
  }
}
