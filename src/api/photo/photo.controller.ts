import { Multer } from 'multer';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  async getPhotoList(@Query('f') uuid: string): Promise<any> {
    return await this.photoService.getPhotoList(uuid);
  }

  @Get()
  async getPhoto(
    @Query('f') folder_id: string,
    @Query('p') photo_id: string,
  ): Promise<any> {
    return await this.photoService.getPhoto(folder_id, photo_id);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('photo', 10, { dest: './uploads' }),
  )
  async makePhotos(
    @Query('f') folder_id: string,
    @Body('memo') memo: string,
    @UploadedFiles() files: Multer.File[],
  ): Promise<any> {
    return await this.photoService.makePhoto(folder_id, memo, files);
  }

  @Patch('')
  async updatePhoto(
    @Query('p') photo_id: string,
    @Body('memo') memo: string,
  ): Promise<any> {
    return await this.photoService.updatePhoto(photo_id, memo);
  }

  @Patch('move')
  async movePhoto(
    @Query('f') new_folder_id: string,
    @Body('photos') photos: string[],
  ): Promise<any> {
    return await this.photoService.movePhoto(new_folder_id, photos);
  }

  @Delete()
  async deletePhoto(@Query('p') uuid: string): Promise<any> {
    return await this.photoService.deletePhoto(uuid);
  }
}
