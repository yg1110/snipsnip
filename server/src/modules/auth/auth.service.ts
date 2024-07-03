import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password' | 'refreshToken'>> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, refreshToken, ...result } = user;
      return result;
    }
    return null;
  }

  async login(payload: LoginUserDto) {
    try {
      const user = await this.userService.findByEmail(payload.email);
      if (user && (await bcrypt.compare(payload.password, user.password))) {
        const payload = { id: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        });
        const refreshToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        });
        await this.userService.updateRefreshToken(user.id, refreshToken);
        return {
          id: payload.id,
          accessToken,
          refreshToken,
        };
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async refresh(userId: number, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException({ error: 'not_found_user', message: '접근이 거부되었습니다.' });
    }

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!refreshTokenMatches) {
      throw new ForbiddenException({
        error: 'not_match_token',
        message: '접근이 거부되었습니다.',
      });
    }
    const findUserPayload = {
      id: user.id,
      email: user.email,
    };

    const newAccessToken = this.jwtService.sign(findUserPayload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });

    const newRefreshToken = this.jwtService.sign(findUserPayload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    await this.userService.updateRefreshToken(user.id, newRefreshToken);
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      id: user.id,
    };
  }
}
