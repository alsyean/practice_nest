import { PickType } from '@nestjs/swagger';
import { Cat } from '../cat.schema';

// PickType을 이용해서 기존 schema 에서 선택해서 사용
export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
