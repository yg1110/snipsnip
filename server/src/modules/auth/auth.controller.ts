import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthTokensResponse, CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/auth.dto';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '회원가입하기',
  })
  @ApiBody({
    schema: {
      example: {
        email: 'yg@naver.com',
        password: 'yg',
      },
    },
  })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto.email, createUserDto.password);
  }

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
  async login(@Body() loginUserDto: LoginUserDto): Promise<AuthTokensResponse> {
    const authToken = await this.authService.login(loginUserDto);
    if (authToken) {
      return authToken;
    }
    throw new UnauthorizedException('로그인 정보가 일치하지 않습니다.');
  }

  @ApiOperation({
    summary: '유저 정보 조회하기  ',
    description: `
    {
      "id": 1,
      "email": "yg@naver.com",
      "createdAt": "2024-07-01T04:50:52.000Z",
      "updatedAt": "2024-07-01T04:50:57.000Z",
    }`,
  })
  @Get(':userId')
  findOne(@Param('userId') userId: number): Promise<User> {
    return this.authService.findOne(userId);
  }

  @ApiOperation({
    summary: '유저 수정하기',
  })
  @ApiBody({
    schema: {
      example: {
        email: 'yg2@naver.com',
        password: 'yg2',
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Put(':userId')
  update(@Param('userId') userId: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.authService.update(userId, updateUserDto);
  }

  @ApiOperation({
    summary: '유저 삭제하기',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Delete(':userId')
  remove(@Param('userId') userId: number) {
    return this.authService.remove(userId);
  }
}
