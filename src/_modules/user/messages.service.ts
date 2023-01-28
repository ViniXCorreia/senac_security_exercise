import { Inject, Injectable } from '@nestjs/common';
import { MessageEntity } from 'src/database/entities/message.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { RepositoryProxyModule } from 'src/database/proxy/repository.proxy.module';
import { text } from 'stream/consumers';
import { Repository } from 'typeorm';
import { CryptoService } from '../crypto/crypto.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { SentMessageDto } from './dto/sent-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UserService } from './user.service';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(RepositoryProxyModule.MESSAGE_REPOSITORY)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
  ){}
  create(createMessageDto: CreateMessageDto) {
    return 'This action adds a new message';
  }

  findAllByUser(id: number) {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  async sentMessage(sentMessageDto: SentMessageDto, sentUser: UserEntity){
    let signedMessage = "false"
    const receiveUser = await this.userService.findUserByPublicKey(sentMessageDto.receiverPublicKey);
    const message = this.cryptoService.rsaEncryptWithPublic(sentMessageDto.receiverPublicKey, sentMessageDto.message);
    if(sentMessageDto.sign){
      signedMessage = this.cryptoService.rsaSign(sentUser.privateKey, sentMessageDto.message);
    }
    await this.messageRepository.save({originalContent: sentMessageDto.message,
      contentHash: message,
      sentUser: sentUser,
      receiveUser: receiveUser,
      sign: signedMessage
    })
    return true;
  }
}
