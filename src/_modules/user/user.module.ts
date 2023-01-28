import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RepositoryProxyModule } from 'src/database/proxy/repository.proxy.module';
import { AuthModule } from '../auth/auth.module';
import { CryptoModule } from '../crypto/crypto.module';
import { MessagesService } from './messages.service';

@Module({
  imports:[RepositoryProxyModule.register(), CryptoModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService,MessagesService],
  exports:[UserService]
})
export class UserModule {}
