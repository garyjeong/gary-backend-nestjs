import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FolderService } from './folder.service';

import { ResponseFolderDto } from './dtos/response.dto';
import { Folder } from 'src/typeorm/entities';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  async getFolder(@Query('f') uuid: string): Promise<Folder | Folder[]> {
    return await this.folderService.getFolder(uuid);
  }

  @Post()
  async makeFolder(@Body('name') name: string): Promise<ResponseFolderDto> {
    return await this.folderService.makeFolder(name);
  }

  @Patch()
  async updateFolder(
    @Query('f') uuid: string,
    @Body('name') name: string,
  ): Promise<ResponseFolderDto> {
    return await this.folderService.updateFolder(uuid, name);
  }

  @Delete()
  async deleteFolder(@Query('f') uuid: string): Promise<void> {
    return await this.folderService.deleteFolder(uuid);
  }
}
