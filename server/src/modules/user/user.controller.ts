import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  async createUser(
    @Body() createUserDto: { email: string; password: string },
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.createUser(createUserDto.email, createUserDto.password);
    const { password, ...result } = user;
    return result;
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
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async findUserById(@Param('userId') userId: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findById(userId);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
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
  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: { email?: string; password?: string },
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.updateUser(id, updateUserDto);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  @ApiOperation({
    summary: '유저 삭제하기',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async remove(@Param('userId') userId: number): Promise<{ success: boolean }> {
    await this.userService.remove(userId);
    return { success: true };
  }
}
