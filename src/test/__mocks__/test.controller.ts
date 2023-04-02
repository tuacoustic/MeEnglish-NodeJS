import { testStubArray } from "../stubs/test.stub"

export const mockTestControllerRepo = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto
      }
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
    list: jest.fn().mockImplementation(() => {
      return testStubArray();
    })
  }