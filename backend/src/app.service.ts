
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): { status: string; version: string } {
    return {
      status: 'ok',
      version: '1.0.0',
    };
  }
}
