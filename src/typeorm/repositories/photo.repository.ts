import { Repository } from 'typeorm';
import { Photo } from '../entities';

export class PhotoRepository extends Repository<Photo> {
  //   async findByEmail(email: string): Promise<Folder> {
  //     return await this.findOne({ email });
  //   }
}
