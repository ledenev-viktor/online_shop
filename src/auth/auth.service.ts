import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne({ where: { username } });
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user || !passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      userId: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
