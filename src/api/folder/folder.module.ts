import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from 'src/typeorm/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Folder])],
  providers: [FolderService],
  controllers: [FolderController],
})
export class FolderModule {}
