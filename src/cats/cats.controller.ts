import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-Exception.filter';
import { PositiveintPipe } from '../common/pipe/positiveint.pipe';
import { LoggingInterceptor } from '../common/interceptors/logging.interception';

// nest js cli를 이용한 controller 만들기
// nest g co controller-name
@Controller('cats')
@UseInterceptors(new LoggingInterceptor())
@UseFilters(HttpExceptionFilter) // 해당 controller 제외하고는 filter 처리가 되지 않음
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter) // 해당 api 제외하고는 filter 처리가 되지 않음
  getAllCat() {
    // 강제로 서버 에러
    // 에러가 되면 useFilters에 의해 HttpExceptionFilter로 거쳐 에러 표시가 남
    // throw new HttpException('server error', 500);
    return 'all cats';
  }

  @Get(':id')
  // pipe를 이용해서 변환 및 유효성 검사
  getCat(@Param('id', ParseIntPipe, PositiveintPipe) param: number) {
    console.log(param)
    return 'one cat';
  }
  @Post()
  createCat(@Body() Body) {
    return 'create cat';
  }

  @Put(':id')
  updateCat(@Param('id', ParseIntPipe) param: number, @Body() Body) {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat(@Param('id', ParseIntPipe) param: number, @Body() Body) {
    return 'updatePartialCat cat';
  }
  @Delete(':id')
  deleteCat(@Param('id', ParseIntPipe) param: number) {
    return 'delete cat';
  }
}
