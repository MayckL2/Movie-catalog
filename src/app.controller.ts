import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { typeMovie } from './movies/app.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): {message: string} {
    return this.appService.getHello();
  }
}

