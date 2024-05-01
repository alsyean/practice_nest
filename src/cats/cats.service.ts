import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cat.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

// nest js cli를 이용한 service 만들기
// nest g service service-name
@Injectable()
export class CatsService {
  private _body: CatRequestDto;
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    const isCatExists = await this.catsRepository.existsByEmail(email);

    if (isCatExists) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.createCat({
      email: email,
      name: name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
