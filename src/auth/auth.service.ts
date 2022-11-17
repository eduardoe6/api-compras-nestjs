import { User } from './../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: User) {
    const payload = { sub: user.id, email: user.email };

    return { token: this.jwtService.sign(payload) };
  }

  async validateUser(email: string, password: string) {
    let user: User;

    try {
      user = await this.userService.findByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }
}
