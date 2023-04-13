import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderRepository } from 'src/typeorm/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([FolderRepository])],
  providers: [FolderService],
  controllers: [FolderController],
})
export class FolderModule {}
