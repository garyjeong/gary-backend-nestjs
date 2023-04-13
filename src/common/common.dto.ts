import { IsNumber, IsObject, IsString } from 'class-validator';

export class CommonResponseDto<T> {
  @IsNumber()
  _status_code: number;

  @IsObject()
  _data?: T | T[];

  constructor(status_code: number, data?: T | T[]) {
    this._status_code = status_code;
    this._data = data;
  }
}
