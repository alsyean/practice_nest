import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cat.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';
import { Cat } from "./cat.schema";

// nest js cli를 이용한 service 만들기
// nest g service service-name
@Injectable()
export class CatsService {
  private _body: CatRequestDto;
  constructor(private readonly catsRepository: CatsRepository) {}

  async getCatsAll() {
    const cats = await this.catsRepository.getCatsAll();
    return cats;
  }

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

  async uploadImg(cat: Cat, files: Express.Multer.File) {
    console.log(`file : ${JSON.stringify(files)}`);
    const fileName = `cats/${files.filename}`;

    console.log(fileName);

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }

  async uploadsImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;

    console.log(fileName);

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }
}
