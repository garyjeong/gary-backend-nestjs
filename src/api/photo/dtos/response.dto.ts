import {
  IsDateString,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
// import { CommonResponseDto } from 'src/common/common.dto';
import { Photo } from 'src/typeorm/entities';
import { format } from 'date-fns';

class ResponseFolderDto {
  @IsUUID('4')
  uuid: string;

  @IsString()
  @Length(1000)
  memo: string;

  @IsString()
  @Length(400)
  url: string;

  @IsDateString()
  created_at: string;

  @IsDateString()
  updated_at: string;

  constructor(photo: Photo) {
    this.uuid = photo.uuid;
    this.memo = photo.memo;
    this.url = photo.url;
    this.created_at = format(
      new Date(photo.created_at),
      'yyyy-MM-dd HH:mm:ss',
    );
    this.updated_at = format(
      new Date(photo.created_at),
      'yyyy-MM-dd HH:mm:ss',
    );
  }
}

export { ResponseFolderDto };
