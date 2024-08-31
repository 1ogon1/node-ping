import * as ping from 'ping';
import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  private readonly timeout: number;

  constructor(config: ConfigService) {
    this.timeout = config.get('TIMEOUT');
  }

  @Get(':ip')
  async getHello(@Param('ip') ip: string): Promise<boolean> {
    try {
      const probe = await ping.promise.probe(ip, {
        timeout: this.timeout,
      });

      return probe.alive;
    } catch (error) {
      console.error(error);

      return false;
    }
  }
}
