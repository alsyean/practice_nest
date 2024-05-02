import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CatRequestDto } from './dto/cat.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    const exist_id = await this.catModel.exists({ email });
    let result: boolean = true;
    if (exist_id === null) {
      result = false;
    }
    return result;
  }

  async createCat(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findByEmail(email: string): Promise<Cat | null>{
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findByIdWithoutPassword(id: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(id).select('-password');
    return cat;
  }
}
