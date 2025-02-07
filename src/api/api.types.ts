export type ServiceResponse<T> = {
  status: number;
  success: boolean;
  data: T;
};

export type ServicePaginationResponse<T> = {
  pagination: Pagination;
} & ServiceResponse<T>;

type Pagination = {
  count: number;
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  links: {
    previous: string;
    next: string;
  };
};
