import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ToyIdeaService } from './toyidea.service';

@ApiTags('ToyIdeas')
@Controller('ideas')
export class ToyIdeaController {
  constructor(private readonly toyIdeaService: ToyIdeaService) {}

  @Get()
  async getProjectIdea(): Promise<string> {
    return await this.toyIdeaService.getProjectIdea();
  }
  @Get('send-message')
  async sendMessage(@Query('message') message: string): Promise<void> {
    await this.toyIdeaService.sendMessage(message);
  }
}
