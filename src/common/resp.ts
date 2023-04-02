// Struct API resp:
// 1. Success
// {
//     "status": number,
//     "data": []
// }
// 2. Failed
// {
//     "status": number,
//     "data": [
//         "error_code": string,
//         "message": string,
//     ]
// }

export interface Resp {
    data: any,
    message?: string,
    error?: string,
}

export const responseTesting = (_status: number, data: any, message?: string, error?: string): Resp => {
    return {
        data: Array.isArray(data) ? data : [data],
        message,
        error,
    }
}