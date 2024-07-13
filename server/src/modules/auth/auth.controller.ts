import { Body, Controller, ForbiddenException, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenPayload } from 'src/common/tokenPayload.decorator';

import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards/refreshAuth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '로그인하기',
  })
  @ApiBody({
    schema: {
      example: {
        email: 'yg@naver.com',
        password: 'yg',
      },
    },
  })
  @Post('login')
  async login(@Res() res, @Body() body) {
    const user = await this.authService.login(body);
    if (!user) {
      throw new ForbiddenException({
        error: 'invalid_password',
        message: '잘못된 비밀번호입니다.',
      });
    }

    res.cookie('accessToken', user.accessToken, {
      expires: new Date(Date.now() + Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN)),
    });
    res.cookie('refreshToken', user.refreshToken, {
      expires: new Date(Date.now() + Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN)),
    });
    res.cookie('id', user.id, {
      expires: new Date(Date.now() + Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN)),
    });
    res.send({ id: user.id, accessToken: user.accessToken, refreshToken: user.refreshToken });
  }

  @ApiOperation({ summary: '토큰 갱신하기' })
  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@Res({ passthrough: true }) res: Response, @TokenPayload() tokenPayload: User) {
    return await this.authService.refresh(tokenPayload.id, tokenPayload.refreshToken);
  }
}
