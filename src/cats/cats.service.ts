import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CatRequestDto } from './dto/cat.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cat.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

// nest js cli를 이용한 service 만들기
// nest g service service-name
@Injectable()
export class CatsService {
  private _body: CatRequestDto;
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    const isCatExists = await this.catModel.exists({ email });

    if (isCatExists) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
