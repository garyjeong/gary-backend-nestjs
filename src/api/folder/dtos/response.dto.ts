import { CommonResponseDto } from 'src/common/common.dto';

class Folder {
  uuid: string;
  name: string;
}
export class SuccessFolderResponseDto extends CommonResponseDto<Folder> {
  constructor(data: Folder | Folder[]) {
    super(200, data);
  }
}
