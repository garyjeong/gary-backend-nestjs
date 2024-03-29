import {
  IsDateString,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
// import { CommonResponseDto } from 'src/common/common.dto';
import { Folder } from 'src/typeorm/entities';
import { format } from 'date-fns';

class ResponseFolderDto {
  @IsUUID('4')
  uuid: string;

  @IsString()
  @Length(20)
  name: string;

  @IsDateString()
  created_at: string;

  @IsDateString()
  updated_at: string;

  constructor(folder: Folder) {
    this.uuid = folder.uuid;
    this.name = folder.name;
    this.created_at = format(
      new Date(folder.created_at),
      'yyyy-MM-dd HH:mm:ss',
    );
    this.updated_at = format(
      new Date(folder.created_at),
      'yyyy-MM-dd HH:mm:ss',
    );
  }
}

export { ResponseFolderDto };
