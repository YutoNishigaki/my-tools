import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const jquantsApiKey = this.configService.get<string>('JQUANTS_API_KEY');

    return `Hello World! ${jquantsApiKey}`;
  }
}
