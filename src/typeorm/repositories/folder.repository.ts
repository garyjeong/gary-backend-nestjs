import { Repository } from 'typeorm';
import { Folder } from '../entities';
import { ORMError } from 'src/common/errors';

export class FolderRepository extends Repository<Folder> {
  async findByUUID(uuid: string): Promise<Folder> {
    return await this.findOne({
      where: {
        uuid: uuid,
        deleted_at: null,
      },
    });
  }

  async findAll(): Promise<Folder[]> {
    return await this.find({
      where: {
        deleted_at: null,
      },
    });
  }

  async createFolder(data: Partial<Folder>): Promise<Folder> {
    return await this.save(data);
  }

  async updateFolderName(uuid: string, data: Partial<Folder>): Promise<Folder> {
    const target = await this.findOne({ where: { uuid: uuid } });

    if (!target) {
      throw new ORMError(`Not Found Folder : ${uuid}`);
    }

    const updateData = Object.assign(target, data);
    return await this.save(updateData);
  }

  async deleteFolder(uuid: string): Promise<any> {
    const target = await this.findOne({ where: { uuid: uuid } });

    if (!target) {
      throw new ORMError(`Not Found Folder : ${uuid}`);
    }

    return await this.softDelete({ uuid: uuid });
  }
}
