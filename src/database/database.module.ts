import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { databaseProviders } from './database.provider';


@Global()
@Module({
	providers: [ConfigService, ...databaseProviders],
	exports: [...databaseProviders],
})
export class DatabaseModule {}