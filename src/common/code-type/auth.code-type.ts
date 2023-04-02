import { ErrorType, SuccessType } from "../constant"

interface AuthTypes {
    AUTH_LOGIN_SUCCESSFULLY: SuccessType,
    AUTH_LOGIN_FAILED: ErrorType,
    AUTH_INCORRECT: ErrorType,
    AUTH_EXPIRED: ErrorType,
    AUTH_TOKEN_ERROR: ErrorType,
    AUTH_REFRESH_SUCCESSFULLY: SuccessType,
    AUTH_NOTMATCH: ErrorType,
    AUTH_REFRESH_TOKEN_EXPIRED: ErrorType,
} 
export const authTypes = function(_id?: string): AuthTypes {
    return {
        AUTH_LOGIN_SUCCESSFULLY: {
            code: 'AUTH_LOGIN_SUCCESSFULLY',
            message: 'Login successfully',
        },
        AUTH_LOGIN_FAILED: {
            error_code: 'AUTH_LOGIN_FAILED',
            message: 'Login failed',
        },
        AUTH_INCORRECT: {
            error_code: 'AUTH_INCORRECT',
            message: 'Email or password does not match',
        },
        AUTH_EXPIRED: {
            error_code: 'AUTH_EXPIRED',
            message: 'Login expired',
        },
        AUTH_TOKEN_ERROR: {
            error_code: 'AUTH_TOKEN_ERROR',
            message: 'Token got error',
        },
        AUTH_REFRESH_SUCCESSFULLY: {
            code: 'AUTH_REFRESH_SUCCESSFULLY',
            message: 'Token refresh successfully',
        },
        AUTH_NOTMATCH: {
            error_code: 'AUTH_NOTMATCH',
            message: 'The user does not match',
        },
        AUTH_REFRESH_TOKEN_EXPIRED: {
            error_code: 'AUTH_REFRESH_TOKEN_EXPIRED',
            message: 'Refresh token expired',
        }
    }
}