import { ErrorType } from "../constant"

interface VocabularyTypes {
    VOCAB_GET_FAILED: ErrorType,
    VOCAB_EXISTED: ErrorType,
}

export const vocabularyTypes = function(_id?: string, _word?: string): VocabularyTypes {
    return {
        VOCAB_GET_FAILED: {
            error_code: "VOCAB_GET_FAILED",
            message: "Vocabulary gets unsuccessfully",
        },
        VOCAB_EXISTED: {
            error_code: "VOCAB_EXISTED",
            message: `Vocabulary: ${_word} existed`,
        },
    }
}