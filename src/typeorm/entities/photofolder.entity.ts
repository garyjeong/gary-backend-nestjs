import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Folder } from './folder.entity';
import { Photo } from './photo.entity';

@Entity({
  name: 'photofolder',
})
export class PhotoFolder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Folder, (folder) => folder.uuid)
  folder: Folder;

  @ManyToOne(() => Photo, (photo) => photo.uuid)
  photo: Photo[];
}
