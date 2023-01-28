import { forwardRef, Inject,Injectable } from '@nestjs/common';
import { CryptoService } from '../crypto/crypto.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
      @Inject(forwardRef(() => UserService))
		  private userService: UserService,
      private readonly cryptoService: CryptoService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    const hashPassword = this.cryptoService.hasher256(pass);
    if (user && user.password === hashPassword) {
      const objJsonStr = Buffer.from(user.privateKey, 'base64')
      const objDecoded = JSON.parse(objJsonStr.toString())
      console.log(objDecoded)
      user.privateKey = await this.cryptoService.aesDecrypt(objDecoded.iv, objDecoded.encryptedData, pass).toString()
      // const decryptedAesPrivateKey = this.cryptoService.aesDecrypt()
      return user;
    }
    return null;
  }
}
