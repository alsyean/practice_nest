import { Body, Controller, Delete, Get, Patch, Post, Put, Req } from "@nestjs/common";
import { CatsService } from './cats.service';
import { Request } from "express";

// nest js cli를 이용한 controller 만들기
// nest g co controller-name
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return 'all cats';
  }

  @Get(':id')
  getCat() {
    return 'one cat';
  }
  @Post()
  createCat(@Req() req: Request, @Body() Body) {
    return 'create cat';
  }

  @Put(':id')
  updateCat(@Req() req: Request, @Body() Body) {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat(@Req() req: Request, @Body() Body) {
    return 'updatePartialCat cat';
  }
  @Delete(':id')
  deleteCat(@Req() req: Request, @Body() Body) {
    return 'delete cat';
  }
}
