import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RepositoryProxyModule } from './database/proxy/repository.proxy.module';
import { AuthModule } from './_modules/auth/auth.module';
import { MessagesModule } from './_modules/messages/messages.module';
import { UserModule } from './_modules/user/user.module';

@Module({
  imports: [DatabaseModule, RepositoryProxyModule, UserModule, AuthModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
