import { IsString, IsUUID, Length } from 'class-validator';
// import { CommonResponseDto } from 'src/common/common.dto';
import { Folder } from 'src/typeorm/entities';

class ResponseFolderDto extends Folder {
  @IsUUID('4')
  uuid: string;

  @IsString()
  @Length(20)
  name: string;
}

// export class SuccessFolderResponseDto extends CommonResponseDto<Folder> {
//   constructor(data: Folder | Folder[]) {
//     super(200, data);
//   }
// }

export { ResponseFolderDto };
