import { CommonResponseDto } from 'src/common/common.dto';

class Folder {
  uuid: string;
  name: string;
}
export class FolderResponseDto extends CommonResponseDto<Folder> {}
