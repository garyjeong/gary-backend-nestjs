import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Generated,
  ManyToOne,
} from 'typeorm';
import { Folder } from './folder.entity';

@Entity({
  name: 'photo',
})
export class Photo {
  @Column({
    type: 'varchar',
    primary: true,
    unique: true,
    nullable: false,
    comment: '사진 UUID, Front 제공용 ID',
  })
  @Generated('uuid')
  uuid: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
    comment: '사진 메모',
  })
  memo: string;

  @Column({
    type: 'varchar',
    length: 400,
    nullable: false,
    comment: '사진 URL',
  })
  url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date | null;

  @ManyToOne(() => Folder, (folder) => folder.uuid)
  folder: Folder;
}
