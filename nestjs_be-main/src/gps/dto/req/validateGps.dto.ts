import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ValidateGpsDto {
  @Transform(({ value }) => {
    return parseFloat(value);
  })
  @IsNumber()
  latitude: number;

  @Transform(({ value }) => {
    return parseFloat(value);
  })
  @IsNumber()
  longitude: number;
}
