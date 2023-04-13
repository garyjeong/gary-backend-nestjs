import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from 'src/typeorm/entities';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  async createFolder(folderData: Partial<Folder>): Promise<Folder> {
    const folder = this.folderRepository.create(folderData);
    return this.folderRepository.save(folder);
  }

  async getFolders(): Promise<Folder[]> {
    return this.folderRepository.find();
  }

  async findOneByUuid(uuid: string): Promise<Folder> {
    const query = this.folderRepository
      .createQueryBuilder('folder')
      .where('folder.uuid = :uuid', { uuid })
      .getOne();

    return query;
  }

  async updateFolder(
    uuid: string,
    folderData: Partial<Folder>,
  ): Promise<Folder> {
    await this.folderRepository.update(uuid, folderData);
    return this.findOneByUuid(uuid);
  }

  async deleteFolder(uuid: string): Promise<void> {
    await this.folderRepository
      .createQueryBuilder()
      .softDelete()
      .where('uuid = :uuid', { uuid })
      .execute();
  }
}
