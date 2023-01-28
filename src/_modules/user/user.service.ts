import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { RepositoryProxyModule } from 'src/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CryptoService } from '../crypto/crypto.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(RepositoryProxyModule.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
  ){}

  async login(loginDto: LoginDto){
    const success = await this.authService.validateUser(loginDto.username, loginDto.password)
    return success
  }

  async create(createUserDto: CreateUserDto) {
    const originalPassword = createUserDto.password;
    createUserDto.password = this.cryptoService.hasher256(originalPassword);
    const rsakeys = this.cryptoService.rsaKeysGenerate();
    createUserDto.publicKey = rsakeys.publicKey;
    let privateKeyAesEncrypted = this.cryptoService.aesEncrypt(rsakeys.privateKey, originalPassword)
    const objJsonStr = JSON.stringify(privateKeyAesEncrypted);
    const objJsonB64 = Buffer.from(objJsonStr).toString('base64')
    createUserDto.privateKey = objJsonB64;
    await this.userRepository.save(createUserDto)
    return {
      success: true,
      message: 'Úsuario Criado'
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({where: {id: id}})
  }

 async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto)
  }

 async findByUsername(username: string){
    return await this.userRepository.findOne({where: {username: username}})
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return true
  }

  async findUserByPublicKey(publicKey: string){
    const user =await  this.userRepository.findOne({where: { publicKey: publicKey}});
    return user;
  }
}
