import { IsBoolean, IsBooleanString, IsString } from "class-validator";

export class SentMessageDto {
    @IsString()
    receiverPublicKey: string;

    @IsString()
    message: string;

    @IsBoolean()
    sign?: boolean = false;
}