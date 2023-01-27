import { Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common/interfaces';
import { DataSource } from 'typeorm';
import { DatabaseModule } from "../database.module";
import { DB_POSTGRES } from '../database.provider';
import { MessageEntity } from '../entities/message.entity';
import { UserEntity } from '../entities/user.entity';

@Module({
    imports:[DatabaseModule]
})
export class RepositoryProxyModule{
    static USER_REPOSITORY = 'UserRepository';
    static MESSAGE_REPOSITORY = 'MessageRepository'

    static register(): DynamicModule{
        return {
            module: RepositoryProxyModule,
            providers: [{
                provide: RepositoryProxyModule.USER_REPOSITORY,
                useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
                inject:[DB_POSTGRES]
            },
            {
                provide: RepositoryProxyModule.MESSAGE_REPOSITORY,
                useFactory: (dataSource: DataSource) => dataSource.getRepository(MessageEntity),
                inject:[DB_POSTGRES]
            }
            ],
            exports: [
                RepositoryProxyModule.USER_REPOSITORY,
                RepositoryProxyModule.MESSAGE_REPOSITORY,
            ]
        }
    }
}