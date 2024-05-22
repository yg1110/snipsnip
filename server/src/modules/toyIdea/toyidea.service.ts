import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class ToyIdeaService {
  private apiUrl: string;
  private apiKey: string;
  private bot: TelegramBot;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');
    this.apiUrl = this.configService.get<string>('OPENAI_API_URL');
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.bot = new TelegramBot(token, { polling: false });
  }

  async sendMessage(message: string): Promise<void> {
    await this.bot.sendMessage(this.chatId, message);
  }

  async getProjectIdea(): Promise<string> {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '너는 신선한 토이/사이드 프로젝트를 추천해주는 봇이야',
        },
        {
          role: 'user',
          content: '한달정도의 기간으로 할 수 있을만한 참신한 프로젝트를 자세히 알려줘',
        },
      ],
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };
    try {
      const response = await axios.post(this.apiUrl, data, { headers: headers });
      const idea = response.data.choices[0].message.content.trim();
      await this.sendMessage(idea);
      return idea;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        console.log(response?.data.error.message);
      }
    }
  }
}
