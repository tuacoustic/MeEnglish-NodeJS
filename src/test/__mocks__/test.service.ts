import { testStubArray } from "../stubs/test.stub";

export const mockTestServiceRepo = {
  create: jest.fn().mockImplementation(dto => dto),
  save: jest.fn().mockImplementation(test => Promise.resolve({
    id: Date.now(),
    ...test,
  })),
  find: jest.fn().mockResolvedValue(testStubArray())
}