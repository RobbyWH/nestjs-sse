import { Controller, Get, Sse, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService, MessageEvent } from './app.service';
import { Todo } from '@prisma/client';
import { Request } from 'express';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('event')
  sendEvent(): Observable<MessageEvent> {
    return this.appService.sendEvent();
  }

  @Sse('weather')
  getWeather(): Observable<MessageEvent> {
    return this.appService.getWeather();
  }

  @Sse('todo')
  getTodo(@Query() query): Observable<MessageEvent> {
    const id = parseInt(query.id);
    return this.appService.getTodo(id);
  }
}
