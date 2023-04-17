import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Generated,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Photo } from './photo.entity';

@Entity({
  name: 'folder',
})
export class Folder {
  @Column({
    type: 'varchar',
    primary: true,
    unique: true,
    nullable: false,
    comment: '폴더 UUID, Front 제공용 ID',
  })
  @Generated('uuid')
  uuid: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: '폴더 이름',
  })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date | null;

  @OneToMany(() => Photo, (photo) => photo.uuid)
  photos: Photo[];
}
