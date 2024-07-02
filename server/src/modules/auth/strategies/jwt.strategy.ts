import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { Auth } from '../dto/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  // authGuard를 통과한 토큰을 복호화하여 사용자의 정보를 payload로 받아온다.
  async validate(payload: Auth) {
    const { id, email } = payload;

    if (!id || !email) {
      throw new UnauthorizedException('데이터가 잘못되었습니다.');
    }

    const user = await this.authService.findOne(id);

    if (!user) {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }

    if (user.deletedAt !== null) {
      throw new BadRequestException('탈퇴된 유저입니다.');
    }

    return payload;
  }
}
