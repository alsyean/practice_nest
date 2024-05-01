import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cat.schema';

// PickType을 이용해서 기존 schema 에서 선택해서 사용 후 추가 가능
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '3280199',
    description: 'id',
  })
  id: string;
}
