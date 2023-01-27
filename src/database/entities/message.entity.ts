import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/database/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Repository } from "typeorm";

@Entity({name: 'message'})
export class MessageEntity {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}
    @PrimaryGeneratedColumn()
    id: number;

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
