// function to return correct type
// a ?? b return typeof a
export const getOrDefault = <T, U>(
  data: T | undefined,
  defaultData: U,
): T | U => data ?? defaultData
