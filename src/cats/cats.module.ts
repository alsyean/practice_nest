import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// nest js cli를 이용한 Module 만들기
// nest g mo module-name
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
