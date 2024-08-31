import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';

const config = () => ({
  NODE_ENV: process.env.NODE_ENV,
  PING_TIMEOUT: process.env.PING_TIMEOUT,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve('./.env'),
      load: [config],
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
