import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { testLog } from '@packages/domain';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  async getHello(): Promise<string> {
    const jquantsApiKey = this.configService.get<string>('JQUANTS_API_KEY');
    if (!jquantsApiKey) {
      throw new Error('JQUANTS_API_KEY is not configured');
    }

    const url = new URL('/v2/equities/bars/daily', 'https://api.jquants.com');
    url.searchParams.set('code', '86970');
    url.searchParams.set('date', '20260120');

    const response = await fetch(url.toString(), {
      headers: {
        'x-api-key': jquantsApiKey,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = await response.json();
    console.log(payload);

    void testLog();

    return 'hoge';
  }
}
