import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { AuthTokensResponse, LoginUserDto, UpdateUserDto } from './dto/auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('auth')
      .where('auth.id = :id', { id })
      .select(['auth.id', 'auth.email', 'auth.createdAt', 'auth.updatedAt', 'auth.deletedAt'])
      .getOne();
    if (!user) {
      throw new NotFoundException('유저 정보를 찾을 수 없습니다.');
    }
    if (user.deletedAt !== null) {
      throw new BadRequestException('탈퇴된 유저입니다.');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('auth')
        .where('auth.id = :id', { id })
        .andWhere('auth.deletedAt IS NULL')
        .getOne();
      if (!user) {
        throw new NotFoundException('유저 정보를 찾을 수 없습니다.');
      }
      if (updateUserDto.email !== null) {
        user.email = updateUserDto.email;
      }
      if (updateUserDto.password !== null) {
        user.password = await bcrypt.hash(updateUserDto.password, 10);
      }
      await this.userRepository.save(user);
      return this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<{ status: number; message: string }> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('auth')
        .where('auth.id = :id', { id })
        .andWhere('auth.deletedAt IS NULL')
        .getOne();
      if (!user) {
        throw new NotFoundException('유저를 찾을 수 없습니다.');
      }
      await this.userRepository.update(id, { deletedAt: new Date() });
      return { status: 204, message: '유저를 삭제했습니다.' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthTokensResponse> {
    const user = await this.userRepository.findOne({ where: { email: loginUserDto.email } });
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      const payload = { id: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      });
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
      });
      return {
        id: payload.id,
        accessToken,
        refreshToken,
      };
    }
    return null;
  }
}
