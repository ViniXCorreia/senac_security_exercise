import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/database/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Repository } from "typeorm";

@Entity({name: 'message'})
export class MessageEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalContent: string;

    @Column()
    contentHash: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({nullable: true})
    sign: string;

    @ManyToOne(() => UserEntity, (user) => user.messagesSent)
    sentUser: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.messagesReceive)
    receiveUser: UserEntity
}
