import { Injectable } from '@nestjs/common';
import { FolderResponseDto } from './dtos/response.dto';
import { CreateFolderDto, FolderDto } from './dtos/request.dto';

@Injectable()
export class FolderService {
  async getFolder(dto: FolderDto) {
    return;
  }

  async getFolderList() {
    return;
  }

  async makeFolder(dto: CreateFolderDto) {
    return;
  }

  async updateFolder(dto: FolderDto, name: string) {
    return;
  }

  async deleteFolder(dto: FolderDto) {
    return;
  }
}
