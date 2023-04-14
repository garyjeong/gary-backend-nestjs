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

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  async getFolderList(): Promise<ResponseFolderDto[]> {
    return this.folderService.getFolderList();
  }

  @Get('')
  async getFolder(@Query('id') uuid: string): Promise<ResponseFolderDto> {
    return this.folderService.getFolder(uuid);
  }

  @Post()
  async makeFolder(@Body('name') name: string): Promise<ResponseFolderDto> {
    return this.folderService.makeFolder(name);
  }

  @Patch()
  async updateFolder(
    @Query('id') uuid: string,
    @Body('name') name: string,
  ): Promise<ResponseFolderDto> {
    return this.folderService.updateFolder(uuid, name);
  }

  @Delete()
  async deleteFolder(@Query('id') uuid: string): Promise<void> {
    return this.folderService.deleteFolder(uuid);
  }
}
