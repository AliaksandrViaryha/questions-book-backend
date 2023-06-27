import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config, IConfig } from '../shared';
import { typeOrmModuleOptions } from './config';
import { QuestionModule } from '../question';
import { CategoryModule } from '../category';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    QuestionModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: IConfig, useClass: Config }],
})
export class AppModule {}
