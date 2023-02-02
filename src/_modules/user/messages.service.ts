import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MessageEntity } from 'src/database/entities/message.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { RepositoryProxyModule } from 'src/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { CryptoService } from '../crypto/crypto.service';
import { CheckSignDto } from './dto/check-sign.dto';
import { SentMessageDto } from './dto/sent-message.dto';
import { UserService } from './user.service';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(RepositoryProxyModule.MESSAGE_REPOSITORY)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
  ){}

  async findAllByUser(user: UserEntity) {
    const messages = await this.messageRepository.find({where: {receiveUser: {id: user.id}}});
    let decryptedMessages: string[] = [];
    for(const message of messages){
      let textMessage = this.cryptoService.rsaDecryptWithPrivate(user.privateKey, message.contentHash);
      decryptedMessages.push(textMessage)
    }
    return decryptedMessages;
  }

  async findOneByContentHash(hash: string) {
    const content= await this.messageRepository.findOne({where: {sign: hash}});
    if(content === null){
      throw new NotFoundException('Assinatura não encontrada');
    }
    return content;
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
    return {
      success: true,
      message: 'Mensagem Enviada'
    };
  }

  async checkSign(checkSignDto: CheckSignDto, user: UserEntity){
    const getOrignalContent = await this.findOneByContentHash(checkSignDto.sign);
    const originalContent = this.cryptoService.rsaDecryptWithPrivate(user.privateKey, getOrignalContent.contentHash);
    const verify = this.cryptoService.rsaSignVerify(checkSignDto.senderPublicKey, checkSignDto.sign , originalContent);
    return verify;
  }
}
