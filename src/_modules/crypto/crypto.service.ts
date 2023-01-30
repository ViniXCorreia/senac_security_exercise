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

    rsaKeysGenerate(){
        const NodeRSA = require('node-rsa')
        let rsaKey = new NodeRSA({b:512})
        const privateKey = rsaKey.exportKey("pkcs8-private");
        const publicKey = rsaKey.exportKey("pkcs8-public");
        return {privateKey, publicKey};
    }

    async rsaKeysLogin(privateKeyLiteral: string){
        const NodeRSA = require('node-rsa')
        const rsaKey = new NodeRSA(privateKeyLiteral);
        return rsaKey;
    }

    rsaEncryptWithPrivate(privateKeyLiteral: any, text: string){
        const NodeRSA = require('node-rsa')
        const rsaKey = new NodeRSA(privateKeyLiteral);
        const encrypted = rsaKey.encrypt(text);
        const encryptB64 = encrypted.toString('base64');
        return encryptB64;
    }

    rsaDecryptWithPrivate(privateKeyLiteral: any, text:string){
        const NodeRSA = require('node-rsa')
        const rsaKey = new NodeRSA(privateKeyLiteral);
        const textDecode = Buffer.from(text, 'base64');
        const decrypted = rsaKey.decrypt(textDecode);
        return decrypted.toString('utf-8')
    }

    rsaEncryptWithPublic(publicKeyLiteral: any, text: string){
        const NodeRSA = require('node-rsa')
        const rsaKey = new NodeRSA(publicKeyLiteral);
        const encrypted = rsaKey.encrypt(text);
        const encryptB64 = encrypted.toString('base64');
        return encryptB64;
    }

    rsaSign(privateKeyLiteral: string, text: string){
        const NodeRSA = require('node-rsa')
        const rsaKey = new NodeRSA(privateKeyLiteral);
        let signedContent = rsaKey.sign(text);
        const signedContentB64 = signedContent.toString('base64');
        return signedContentB64;
    }

    rsaSignVerify(publicKeyLiteral: string, sign: string, originalContent: string){
        const NodeRSA = require('node-rsa')
        const rsaKey = new NodeRSA(publicKeyLiteral);
        const checkSign = rsaKey.verify(originalContent, Buffer.from(sign, 'base64'));
        return checkSign;
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