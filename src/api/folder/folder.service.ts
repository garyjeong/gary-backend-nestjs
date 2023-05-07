import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CustomInternalError,
  CustomInvalidError,
  CustomNotFoundError,
  ORMError,
} from 'src/common/errors';
import { validate } from 'uuid';
import { ResponseFolderDto } from './dtos/response.dto';
import { Folder } from 'src/typeorm/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) {}

  async getFolder(
    uuid: string,
  ): Promise<ResponseFolderDto | ResponseFolderDto[]> {
    try {
      let folders;
      if (!uuid) {
        folders = await this.folderRepository.find({
          where: {
            deleted_at: null,
          },
        });
      } else {
        if (!validate(uuid)) {
          throw new CustomInternalError(
            '검색 ID가 유효하지 않습니다.',
          );
        }

        folders = await this.folderRepository.find({
          where: {
            uuid: uuid,
            deleted_at: null,
          },
        });
      }

      if (!folders) {
        throw new CustomNotFoundError('폴더를 찾을 수 없습니다.');
      }
      return folders.map((folder) => new ResponseFolderDto(folder));
    } catch (e) {
      throw new CustomInternalError(e.message);
    }
  }

  async makeFolder(name: string): Promise<ResponseFolderDto> {
    try {
      const folder = await this.folderRepository.save({ name: name });
      return new ResponseFolderDto(folder);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async updateFolder(
    uuid: string,
    name: string,
  ): Promise<ResponseFolderDto> {
    try {
      if (!uuid) {
        throw new CustomInvalidError('검색 조건이 없습니다.');
      }
      if (!validate(uuid)) {
        throw new CustomInternalError('검색 ID가 유효하지 않습니다.');
      }

      const folder = await this.folderRepository.findOne({
        where: { uuid: uuid },
      });

      if (!folder) {
        throw new ORMError(`Not Found Folder : ${uuid}`);
      }
      folder.name = name;
      await this.folderRepository.save(folder);

      return new ResponseFolderDto(folder);
    } catch (e) {
      return e;
    }
  }

  async deleteFolder(uuid: string): Promise<any> {
    try {
      if (!uuid) {
        throw new CustomInvalidError('검색 조건이 없습니다.');
      }
      if (!validate(uuid)) {
        throw new CustomInternalError('검색 ID가 유효하지 않습니다.');
      }

      const folder = await this.folderRepository.findOne({
        where: { uuid: uuid },
      });

      if (!folder) {
        throw new ORMError(`Not Found Folder : ${uuid}`);
      }

      await this.folderRepository.softDelete({ uuid: folder.uuid });
    } catch (e) {
      return e;
    }
  }
}
