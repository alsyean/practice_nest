import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'test@test.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
    type: mongoose.Schema.Types.String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'test name',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
    unique: false,
    type: mongoose.Schema.Types.String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '12345',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
    unique: false,
    type: mongoose.Schema.Types.String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'https://imageurl.com',
    description: 'image url',
    required: true,
  })
  @Prop({
    default:
      'https://github.com/amamov/NestJS-solid-restapi-boilerplate/raw/main/docs/images/1.jpeg',
  })
  @IsEmpty()
  img_url: string;

  readonly readOnlyData: { id: string; email: string; name: string; img_url: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    img_url: this.img_url,
  };
});
