import { IsString, IsUUID } from 'class-validator';

class CreateFolderDto {
  @IsString()
  name: string;
}

class FolderDto {
  // TypeORM에서 버전 4의 UUID 생성기를 사용한다.
  @IsUUID('4')
  uuid: string;
}

export { CreateFolderDto, FolderDto };
