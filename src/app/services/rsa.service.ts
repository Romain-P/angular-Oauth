import {config} from "../app.config";
import {Buffer} from 'buffer/';
import * as crypto from "crypto-browserify";

export class RsaService {
  private publicKey: string;
  private enabled: boolean;

  constructor() {
    //BEP format required by crypto
    this.publicKey = "-----BEGIN PUBLIC KEY-----\n" + config.authentication.rsa.publicKey + "\n-----END PUBLIC KEY-----";
    this.enabled = config.authentication.rsa.enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  encrypt(plaintext: string): string {
    if (!this.enabled)
      return plaintext;

    let buffer = new Buffer(plaintext);
    let encrypted = crypto.publicEncrypt({ key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING}, buffer);

    return encrypted.toString('base64');
  }
}
