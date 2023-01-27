import { MessageEntity } from 'src/database/entities/message.entity';
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

  @Column({nullable: true})
  publicKey: string;

  @Column({nullable: true})
  privateKey: string;

  @OneToMany(() => MessageEntity, (message)=> message.sentUser)
  messagesSent: MessageEntity[];

  @OneToMany(() => MessageEntity, (message)=> message.receiveUser)
  messagesReceive: MessageEntity[];
}