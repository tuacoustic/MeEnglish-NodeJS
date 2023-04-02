import { ErrorType, SuccessType } from "../constant"

interface UserTypes {
    USER_UPDATED_SUCCESSFULLY: SuccessType,
    USER_DELETED_SUCCESSFULLY: SuccessType,
    USER_DELETE_ERROR: ErrorType,
    USER_NOT_FOUND: ErrorType,
    USER_CREATE_ERROR: ErrorType,
    USER_UPDATE_ERROR: ErrorType,
    USER_GET_ERROR: ErrorType,
    USER_EXISTS: ErrorType,
    USER_GETALL_ERROR: ErrorType,
    NOT_ALLOWED: ErrorType,
} 
export const userTypes = function(id?: string): UserTypes {
    return {
        USER_UPDATED_SUCCESSFULLY: {
            code: 'USER_UPDATED_SUCCESSFULLY',
            message: 'Updated user successfully',
        },
        USER_CREATE_ERROR: {
            error_code: 'USER_CREATE_ERROR',
            message: 'User creation error',
        },
        USER_UPDATE_ERROR: {
            error_code: 'USER_UPDATE_ERROR',
            message: `Update user with Id: ${id} failed`,
        },
        USER_GET_ERROR: {
            error_code: 'USER_GET_ERROR',
            message: `Getting user information failed`,
        },
        USER_DELETED_SUCCESSFULLY: {
            code: 'USER_DELETED_SUCCESSFULLY',
            message: 'Deleted user successfully',
        },
        USER_DELETE_ERROR: {
            error_code: 'USER_DELETE_ERROR',
            message: `Remove user with Id: ${id} failed`,
        },
        USER_NOT_FOUND: {
            error_code: 'USER_NOT_FOUND',
            message: `User not found`,
        },
        USER_EXISTS: {
            error_code: 'USER_EXISTS',
            message: 'User already registered with email',
        },
        USER_GETALL_ERROR: {
            error_code: 'USER_GETALL_ERROR',
            message: 'Getting all users failed',
        },
        NOT_ALLOWED: {
            error_code: 'NOT_ALLOWED',
            message: 'You are not allowed',
        }
    }
}