import { Body, Controller, Get, HttpCode, Param, Redirect, Req } from "@nestjs/common";
import { Request } from "express";
import { AppService } from './app.service';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @HttpCode(200) HttpCode 지정 가능
  // @Redirect('https://nestjs.com', /**/301) // 리다이렉트 시킬 수도 있음
  getHello(@Req() req: Request, @Body() Body, @Param() Param): string {
    console.log(req);
    return this.appService.getHello();
  }
}
