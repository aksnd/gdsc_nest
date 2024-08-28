import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateDictDto {
  @IsString()
  userId: string;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  mountainId: number;
}
