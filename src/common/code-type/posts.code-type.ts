import { ErrorType, SuccessType } from "../constant"

interface PostTypes {
    POST_CREATE_ERROR: ErrorType,
    POST_CREATE_SUCCESSFULLY: SuccessType,
} 
export const postTypes = function(_id?: string): PostTypes {
    return {
        POST_CREATE_ERROR: {
            error_code: 'POST_CREATE_ERROR',
            message: 'Created post failed',
        },
        POST_CREATE_SUCCESSFULLY: {
            code: 'POST_CREATE_SUCCESSFULLY',
            message: 'Post created successfully'
        }
    }
}