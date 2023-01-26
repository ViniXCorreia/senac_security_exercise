import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    publicKey?: string;

    @IsString()
    privateKey?: string;
}
