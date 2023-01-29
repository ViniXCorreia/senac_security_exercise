import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RepositoryProxyModule } from './database/proxy/repository.proxy.module';
import { AuthModule } from './_modules/auth/auth.module';
import { UserModule } from './_modules/user/user.module';

@Module({
  imports: [DatabaseModule, RepositoryProxyModule, UserModule, AuthModule],
})
export class AppModule {}
