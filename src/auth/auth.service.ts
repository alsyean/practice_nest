import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CatsRepository } from '../cats/cats.repository';
import { LoginRequestDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;
    const cat = await this.catsRepository.findByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인 해주세요.');
    }

    const isValidPassword = await bcrypt.compare(password, cat.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('비밀번호가 일치 하지 않습니다.');
    }

    const payload = { email: email, sub: cat.id }

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
