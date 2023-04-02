import { TestDto } from "../test.dto"

export const testStub = (): TestDto => {
    return {
        id: '1',
        name: 'Fake users',
    }
}

export const testStubArray = (): TestDto[] => {
    return [
        {
            id: '1',
            name: 'Fake users',
        }
    ]
}

export const expectedStub = (): TestDto[] => {
    return [
        {
            id: expect.any(String),
            name: 'Fake users',
        }
    ]
}