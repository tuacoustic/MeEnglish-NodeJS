import { SuccessType } from "../constant"

interface TestTypes {
    TEST_UPDATE_SUCCESSFULLY: SuccessType,
}

export const testTypes = function(_id?: string): TestTypes {
    return {
        TEST_UPDATE_SUCCESSFULLY: {
            code: "TEST_UPDATE_SUCCESSFULLY",
            message: "Test updated successfully",
        }
    }
}