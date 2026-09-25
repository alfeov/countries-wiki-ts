export interface ResultType<T extends unknown[]> {
  objects: T
  meta: Meta
}

export interface RawResultType<T extends unknown[]> {
  data: ResultType<T>
}

export interface Meta {
  offset: number
  limit: number
  total: number
}
