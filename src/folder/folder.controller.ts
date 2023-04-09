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
import { CreateFolderDto, FolderDto } from './dtos/request.dto';
import { FolderResponseDto } from './dtos/response.dto';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get('/:uuid')
  async getFolder(@Param() dto: FolderDto) {
    return this.folderService.getFolder(dto);
  }

  @Get()
  async getFolderList() {
    return this.folderService.getFolderList();
  }

  @Post()
  async makeFolder(@Body() dto: CreateFolderDto) {
    return this.folderService.makeFolder(dto);
  }

  @Patch('/:uuid')
  async updateFolder(@Param() dto: FolderDto, @Body('name') name = '') {
    return this.folderService.updateFolder(dto, name);
  }

  @Delete('/:uuid')
  async deleteFolder(@Param() dto: FolderDto) {
    return this.folderService.deleteFolder(dto);
  }
}
