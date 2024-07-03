import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: User): Promise<User> {
    const { id, email } = payload;

    if (!id) {
      throw new UnauthorizedException('유저가 아닙니다.');
    }

    if (!email) {
      throw new UnauthorizedException('유저가 아닙니다.');
    }

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }

    if (user.deletedAt !== null) {
      throw new UnauthorizedException('탈퇴한 회원입니다.');
    }

    return user;
  }
}
