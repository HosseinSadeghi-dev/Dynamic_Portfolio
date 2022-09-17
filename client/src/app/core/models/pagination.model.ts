export interface PaginationModel<T> {
  results: T[];
  total: number;
  page_total: number;
}
export interface PaginationHandleModel {
  pageNumber: number
  pageSize: number,
  total?: number;
}
