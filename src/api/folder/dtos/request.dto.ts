import { IsString, IsUUID, Length } from 'class-validator';

class GetFolderDto {
  @IsUUID('4')
  uuid: string;
}

class MakeFolderDto {
  @IsString()
  @Length(20)
  name: string;
}

class PatchFolderDto {
  @IsUUID('4')
  uuid: string;

  @IsString()
  @Length(20)
  name: string;
}

class DeleteFolderDto {
  @IsUUID('4')
  uuid: string;
}

export { GetFolderDto, MakeFolderDto, PatchFolderDto, DeleteFolderDto };
