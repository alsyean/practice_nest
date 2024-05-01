import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { CatsRepository } from './cats.repository';
import { AuthModule } from '../auth/auth.module';

// nest js cli를 이용한 Module 만들기
// nest g mo module-name
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    // 순환 참조를 방지하기 위한 조치 
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsRepository, CatsService],
})
export class CatsModule {}
