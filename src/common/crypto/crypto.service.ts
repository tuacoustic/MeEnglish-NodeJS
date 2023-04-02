import { Injectable } from "@nestjs/common";
import { createHash, createCipheriv, createDecipheriv } from "crypto";
import configuration from "../../config/configuration";
import { CryptoResp } from "../constant";

@Injectable()
export class CryptoService {
    constructor() {}

    get() {
        const key = createHash("sha512")
            .update(configuration().secretKey)
            .digest("hex")
            .substring(0, 32);
        const encryptionIV = createHash("sha512")
            .update(configuration().secretIV)
            .digest("hex")
            .substring(0, 16);
        return {
            key, encryptionIV
        }
    }

    encyptData(data: string): string {
        const { key, encryptionIV } = this.get();
        const cipher = createCipheriv(configuration().encryptMethod, key, encryptionIV);
        return Buffer.from(
          cipher.update(data, "utf8", "hex") + cipher.final("hex")
        ).toString("base64"); // Encrypts data and converts to hex and base64
    }

    decryptData(token: string): CryptoResp {
        const buff = Buffer.from(token, "base64");
        const { key, encryptionIV } = this.get();
        const decipher = createDecipheriv(configuration().encryptMethod, key, encryptionIV);
        try {
            // Decrypts data and converts to utf8
            const decryptData = decipher.update(buff.toString("utf8"), "hex", "utf8")+decipher.final("utf8")
            return {
                decryptData,
                isDecrypt: true,
            }
        } catch (error) {
          return {
                decryptData: "",
                isDecrypt: false,
          }
        }
    }
}