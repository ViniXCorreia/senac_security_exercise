import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RepositoryProxyModule } from 'src/database/proxy/repository.proxy.module';

@Module({
  imports:[RepositoryProxyModule.register()],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
