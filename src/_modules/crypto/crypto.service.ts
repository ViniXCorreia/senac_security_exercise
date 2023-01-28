import {Injectable} from '@nestjs/common'
import { Buffer } from 'buffer';

@Injectable()
export class CryptoService {

    hasher256(text: string){
        const crypto = require('crypto');
        const sha256Hash = crypto.createHash('sha256');
		const hashPassword = sha256Hash.update(text).digest('hex');
		return hashPassword;
    }

    rsaKeys(){
        const NodeRSA = require('node-rsa')
        let rsaKey = new NodeRSA({b:512})
        const privateKey = rsaKey.exportKey("pkcs8-private");//"private"
        const publicKey = rsaKey.exportKey("pkcs8-public");//"public"
        return{privateKey, publicKey};
    }

    aesEncrypt(text: string, userPassword: string){
        const crypto = require('crypto');
        const algorithm = 'aes-256-cbc';
        const key = userPassword.padStart(32, '0');
        const iv = crypto.randomBytes(16);

        let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')}
    }

    aesDecrypt(ivFrom: string, text: string, userPassword: string) {
        const crypto = require('crypto');
        const algorithm = 'aes-256-cbc';
        const key = userPassword.padStart(32, '0');
        
        let iv = Buffer.from(ivFrom, 'hex');
        const encryptedText = Buffer.from(text, 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted
    }


}