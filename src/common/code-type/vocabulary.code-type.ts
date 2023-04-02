import { ErrorType } from "../constant"

interface VocabularyTypes {
    VOCAB_GET_FAILED: ErrorType,
    // VOCAB_NOT_AVAILABLE: ErrorType,
}

export const vocabularyTypes = function(_id?: string, _word?: string): VocabularyTypes {
    return {
        VOCAB_GET_FAILED: {
            error_code: "VOCAB_GET_FAILED",
            message: "Vocabulary gets unsuccessfully",
        },
    }
}