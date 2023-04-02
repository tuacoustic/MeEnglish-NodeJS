export interface ErrorType {
    error_code: string,
    message: string,
}

export interface SuccessType {
    code: string,
    message: string,
}

export interface RedisType {
    key: string,
    value: string,
    expired?: string | number,
}

export interface RedisKeyType {
    keyName: string,
}

export const RoleType = {
    own: 'own',
    any: 'any'
}

export interface CryptoResp {
    decryptData: string,
    isDecrypt: boolean,
}

export const tokenLifeTime = {
    accessToken: '60m', // 60 minute
    refreshToken: '30d', // 1 month
    redisRefreshToken: 2.592e+6, // 30 days -- per second
    refreshTokenCookie: 2.592e+6, // 30 days -- per second
}