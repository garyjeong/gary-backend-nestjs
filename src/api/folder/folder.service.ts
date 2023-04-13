import { Injectable, UsePipes } from '@nestjs/common';
import { FolderDto } from './dtos/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FolderRepository } from 'src/typeorm/repositories';
import { CustomInternalError, CustomInvalidError } from 'src/common/errors';
import { UUIDValidationPipe } from 'src/middleware/validation.pipe';
import { validate } from 'uuid';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(FolderRepository)
    private readonly folderRepository: FolderRepository,
  ) {}

  async getFolder(dto: Partial<FolderDto>): Promise<any> {
    try {
      if (dto.uuid) {
        throw new CustomInvalidError('검색 조건이 없습니다.');
      }

      return await this.folderRepository.findByUUID(dto.uuid);
    } catch (e) {
      return e;
    }
  }

  async getFolderList(): Promise<any> {
    try {
      return await this.folderRepository.findAll();
    } catch (e) {
      return e;
    }
  }

  async makeFolder(name: string): Promise<any> {
    try {
      return await this.folderRepository.createFolder({
        name: name,
      });
    } catch (e) {
      return e;
    }
  }

  @UsePipes(new UUIDValidationPipe())
  async updateFolder(uuid: string, name: string): Promise<any> {
    try {
      if (!validate(uuid)) {
        throw new CustomInternalError('검색 ID가 유효하지 않습니다.');
      }

      return await this.folderRepository.updateFolderName(uuid, {
        name: name,
      });
    } catch (e) {
      return e;
    }
  }

  async deleteFolder(uuid: string): Promise<any> {
    try {
      if (!validate(uuid)) {
        throw new CustomInternalError('검색 ID가 유효하지 않습니다.');
      }

      return await this.folderRepository.deleteFolder(uuid);
    } catch (e) {
      return e;
    }
  }
}
