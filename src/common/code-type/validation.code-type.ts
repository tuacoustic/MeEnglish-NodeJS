import { ErrorType } from "../constant"

interface ValidationTypes {
    VALIDATION_ERROR: ErrorType
} 
export const validationTypes = function(): ValidationTypes {
    return {
        VALIDATION_ERROR: {
            error_code: 'VALIDATION_ERROR',
            message: 'Validation got errors',
        }
    }
}