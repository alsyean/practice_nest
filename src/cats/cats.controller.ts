import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-Exception.filter';
import { LoggingInterceptor } from '../common/interceptors/logging.interception';
import { CatRequestDto } from './dto/cat.request.dto';
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ReadOnlyCatDto } from "./dto/cat.dto";
import { AuthService } from "../auth/auth.service";
import { LoginRequestDto } from "../auth/dto/login.dto";

// nest js cli를 이용한 controller 만들기
// nest g co controller-name
@Controller('cats')
@UseInterceptors(new LoggingInterceptor())
@UseFilters(HttpExceptionFilter) // 해당 controller 제외하고는 filter 처리가 되지 않음
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiOperation({ summary: 'sign up' })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyCatDto,
  })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post('login')
  logIn(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogin(body);
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
