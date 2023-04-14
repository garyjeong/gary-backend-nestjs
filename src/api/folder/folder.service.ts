import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CustomInternalError,
  CustomInvalidError,
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

  async getFolderList(): Promise<ResponseFolderDto[]> {
    try {
      return await this.folderRepository.find({
        where: {
          deleted_at: null,
        },
      });
    } catch (e) {
      return e;
    }
  }

  async getFolder(uuid: string): Promise<ResponseFolderDto> {
    try {
      if (uuid) {
        throw new CustomInvalidError('검색 조건이 없습니다.');
      }

      return await this.folderRepository.findOne({
        where: {
          uuid: uuid,
          deleted_at: null,
        },
      });
    } catch (e) {
      return e;
    }
  }

  async makeFolder(name: string): Promise<ResponseFolderDto> {
    try {
      return await this.folderRepository.save({ name: name });
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async updateFolder(uuid: string, name: string): Promise<ResponseFolderDto> {
    try {
      if (!validate(uuid)) {
        throw new CustomInternalError('검색 ID가 유효하지 않습니다.');
      }

      const target = await this.folderRepository.findOne({
        where: { uuid: uuid },
      });

      if (!target) {
        throw new ORMError(`Not Found Folder : ${uuid}`);
      }
      target.name = name;
      return await this.folderRepository.save(target);
    } catch (e) {
      return e;
    }
  }

  async deleteFolder(uuid: string): Promise<any> {
    try {
      if (!validate(uuid)) {
        throw new CustomInternalError('검색 ID가 유효하지 않습니다.');
      }

      const target = await this.folderRepository.findOne({
        where: { uuid: uuid },
      });

      if (!target) {
        throw new ORMError(`Not Found Folder : ${uuid}`);
      }

      await this.folderRepository.softDelete({ uuid: uuid });
    } catch (e) {
      return e;
    }
  }
}
