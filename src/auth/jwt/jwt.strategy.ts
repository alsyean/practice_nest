import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from '../../cats/cats.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰 추출
      ignoreExpiration: false, // 만료 기간
      secretOrKey: process.env.JWT_SECRET, //시크릿 키
    });
  }

  async validate(payload: Payload) {
    const current_cat = await this.catsRepository.findByIdWithoutPassword(
      payload.sub,
    );

    if (current_cat) {
      return current_cat; // request.user
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
