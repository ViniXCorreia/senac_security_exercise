import { IsString } from "class-validator";

export class CheckSignDto{
    @IsString()
    senderPublicKey: string;

    @IsString()
    sign: string;
}