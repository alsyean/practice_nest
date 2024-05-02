import {
  Body,
  Controller,
  Get, HttpStatus, ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-Exception.filter';
import { LoggingInterceptor } from '../common/interceptors/logging.interception';
import { CatRequestDto } from './dto/cat.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from "../common/utils/multer.options";
import { Cat } from "./cat.schema";

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
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentUser() cat) {
    return cat;
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  uploadCatImg(@UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @CurrentUser() cat,
  ) {
    console.log(`file : ${JSON.stringify(file)}`);
    console.log(`cat : ${JSON.stringify(cat)}`);
    return this.catsService.uploadImg(cat, file);
  }

  // 파일 여러개
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('uploads')
  uploadCatsImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log(files);

    // return 'uploadImg';
    // return { image: `http://localhost:8000/media/cats/${files[0].filename}` };
    return this.catsService.uploadsImg(cat, files);
  }
}
