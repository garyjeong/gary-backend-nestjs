import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder, Photo } from 'src/typeorm/entities';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './photo.util';

@Module({
  imports: [
    TypeOrmModule.forFeature([Folder, Photo]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 * 1024 },
    }),
  ],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
