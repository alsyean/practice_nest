import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PositiveintPipe implements PipeTransform {
  transform(value: number) {
    if (isNaN(value) || value < 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}