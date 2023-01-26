import { MessageEntity } from 'src/messages/entities/message.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  publicKey: string;

  @Column()
  privateKey: string;

  @OneToMany(() => MessageEntity, (message)=> message.sentUser)
  messagesSent: MessageEntity[];

  @OneToMany(() => MessageEntity, (message)=> message.receiveUser)
  messagesReceive: MessageEntity[];
}