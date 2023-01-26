import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";

@Entity({name: 'message'})
export class MessageEntity {
    @Column()
    originalContent: string;

    @Column()
    contentHash: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.messagesSent)
    sentUser: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.messagesReceive)
    receiveUser: UserEntity
}
