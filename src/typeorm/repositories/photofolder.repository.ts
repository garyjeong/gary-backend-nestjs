import { Repository } from 'typeorm';
import { PhotoFolder } from '../entities';

export class PhotoFolderRepository extends Repository<PhotoFolder> {
  //   async findByEmail(email: string): Promise<Folder> {
  //     return await this.findOne({ email });
  //   }
}
