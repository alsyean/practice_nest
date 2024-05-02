import { OmitType } from '@nestjs/swagger';
import { Cat } from '../cat.schema';

export class CatCurrentDto extends OmitType(Cat, ['password'] as const) {}
