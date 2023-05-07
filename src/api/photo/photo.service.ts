import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'uuid';
import {
  CustomInternalError,
  CustomInvalidError,
  ORMError,
} from 'src/common/errors';
import { Multer } from 'multer';
import { Folder, Photo } from 'src/typeorm/entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async getPhotoList(folder_id: string): Promise<any> {
    try {
      const folder = await this.folderRepository.findOne({
        where: {
          uuid: folder_id,
          deleted_at: null,
        },
      });
      return await this.photoRepository.find({
        where: {
          folder: {
            uuid: folder.uuid,
          },
          deleted_at: null,
        },
      });
    } catch (e) {
      return e;
    }
  }

  async getPhoto(folder_id: string, photo_id: string): Promise<any> {
    try {
      if (!folder_id || !photo_id) {
        throw new CustomInvalidError('검색 조건이 없습니다.');
      }
      if (!validate(folder_id) || !validate(photo_id)) {
        throw new CustomInternalError('검색 ID가 유효하지 않습니다.');
      }

      const photo = await this.photoRepository.findOne({
        where: {
          uuid: photo_id,
        },
        withDeleted: false,
      });

      if (photo.folder.uuid === folder_id) {
        return photo;
      } else {
        throw new CustomInvalidError('해당 폴더에 사진이 없습니다.');
      }
    } catch (e) {
      return e;
    }
  }

  async makePhoto(
    folder_id: string,
    memo: string,
    files: Multer.File | Multer.File[],
  ): Promise<any> {
    try {
      const folder = await this.folderRepository.findOne({
        where: { uuid: folder_id },
        withDeleted: false,
      });

      if (!folder) {
        throw new CustomInvalidError('폴더를 찾을 수 없습니다.');
      }

      const result = await Promise.allSettled(
        files.map((file) => {
          const photo = new Photo();
          photo.url = file.path;
          photo.memo = memo;
          photo.folder = folder;

          this.photoRepository.save(photo);
        }),
      );
      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async updatePhoto(photo_id: string, memo: string): Promise<any> {
    try {
      if (!photo_id) {
        throw new CustomInvalidError('검색 조건이 없습니다.');
      }

      if (!validate(photo_id)) {
        throw new CustomInternalError('검색 ID가 유효하지 않습니다.');
      }

      const photo = await this.photoRepository.findOne({
        where: {
          uuid: photo_id,
          deleted_at: null,
        },
      });

      if (!photo) {
        throw new CustomInvalidError(
          '해당 사진이 삭제되었거나 존재하지 않습니다.',
        );
      }

      photo.memo = memo;

      return await this.photoRepository.save(photo);
    } catch (e) {
      return e;
    }
  }

  async movePhoto(
    new_folder_id: string,
    photos: string[],
  ): Promise<any> {
    try {
      if (!new_folder_id) {
        throw new CustomInvalidError('검색 조건이 없습니다.');
      }
      if (!validate(new_folder_id)) {
        throw new CustomInternalError('검색 ID가 유효하지 않습니다.');
      }

      const folder = await this.folderRepository.findOne({
        where: { uuid: new_folder_id },
        withDeleted: false,
      });

      if (!folder) {
        throw new CustomInvalidError(
          '해당 폴더가 삭제되었거나 존재하지 않습니다.',
        );
      }

      const photo_array = await this.photoRepository.find({
        where: {
          uuid: In(photos),
        },
      });

      return await Promise.allSettled(
        photo_array.map((photo) => {
          photo.folder = folder;
          this.photoRepository.save(photo);
        }),
      );
    } catch (e) {
      return e;
    }
  }

  async deletePhoto(uuid: string): Promise<void> {
    try {
      if (!uuid) {
        throw new CustomInvalidError('검색 조건이 없습니다.');
      }
      if (!validate(uuid)) {
        throw new CustomInternalError('검색 ID가 유효하지 않습니다.');
      }

      const photo = await this.photoRepository.findOne({
        where: { uuid: uuid },
      });

      if (!photo) {
        throw new ORMError(`Not Found Folder : ${uuid}`);
      }

      await this.photoRepository.softDelete({ uuid: uuid });
    } catch (e) {
      return e;
    }
  }
}
