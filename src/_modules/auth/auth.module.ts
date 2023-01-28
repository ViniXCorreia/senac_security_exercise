import { Module, forwardRef } from '@nestjs/common';
import { CryptoModule } from '../crypto/crypto.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports:[ forwardRef(() => UserModule), CryptoModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
