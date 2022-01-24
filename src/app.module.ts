import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './modules/config/config.module';
import { RecruitmentSelectionModule } from './modules/recruitment-selection/recruitment-selection.module';

@Module({
  imports: [
    ConfigModule.forRoot({ path: '.env.yml' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      schema: 'R&S',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        ssl: true,
      },
    }),
    RecruitmentSelectionModule,
  ],
})
export class AppModule {}
