export interface ResultType<T> {
  objects: T
  meta: Meta
}

export interface RawResultType<T> {
  data: ResultType<T>
}

export interface Meta {
  offset: number
  limit: number
  total: number
}
