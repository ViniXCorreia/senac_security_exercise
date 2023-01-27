import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { RepositoryProxyModule } from 'src/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(RepositoryProxyModule.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ){}

  async login(loginDto: LoginDto){
    const success = await this.authService.validateUser(loginDto.username, loginDto.password)
    return success
  }

  async create(createUserDto: CreateUserDto) {
    await this.userRepository.save(createUserDto)
    return true
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
}
