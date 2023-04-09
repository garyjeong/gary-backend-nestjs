import { IsNumber, IsObject, IsString } from 'class-validator';

export class CommonResponseDto<T> {
  @IsNumber()
  status_code: number;

  @IsString()
  error_message?: string;

  @IsObject()
  data?: T[];
}
