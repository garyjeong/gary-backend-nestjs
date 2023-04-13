import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Generated,
  OneToMany,
} from 'typeorm';
import { PhotoFolder } from './photofolder.entity';

@Entity({
  name: 'folder',
})
export class Folder {
  @PrimaryGeneratedColumn({
    comment: '폴더 Row ID',
  })
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    comment: '폴더 UUID, Front 제공용 ID',
  })
  @Generated('uuid')
  uuid: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '폴더 이름',
  })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date | null;

  @OneToMany(() => PhotoFolder, (photoFolder) => photoFolder.folder)
  photoFolders: PhotoFolder[];
}
