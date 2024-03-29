import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Folder, Photo } from './typeorm/entities';
import { PhotoModule } from './api/photo/photo.module';
import { FolderModule } from './api/folder/folder.module';

import * as path from 'path';

const app_env = process.env.APP_ENV;
const config_file =
  app_env || app_env === undefined ? '.env' : `.env.${app_env}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: path.join(__dirname, 'envs', config_file),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Photo, Folder],
        migrations: [__dirname + '**/migrations/*.ts'],
        synchronize: configService.get('DB_SYNC'),
        timezone: 'z',
        autoLoadEntities: true,
        keepConnectionAlive: true,
        logging: true,
      }),
    }),
    PhotoModule,
    FolderModule,
  ],
})
export class AppModule {}
