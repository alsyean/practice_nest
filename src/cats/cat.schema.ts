import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {

  @Prop({
    required: true,
    unique: true,
    type: mongoose.Schema.Types.String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
    unique: false,
    type: mongoose.Schema.Types.String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
    unique: false,
    type: mongoose.Schema.Types.String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsEmpty()
  img_url: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);