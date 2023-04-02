import { ErrorType } from "../constant"

interface CryptoTypes {
    CRYPTO_DECRYPT_ERROR: ErrorType,
}

export const cryptoTypes = function(_id?: string): CryptoTypes {
    return {
        CRYPTO_DECRYPT_ERROR: {
            error_code: "CRYPTO_DECRYPT_ERROR",
            message: "Decrypt token got error",
        }
    }
}