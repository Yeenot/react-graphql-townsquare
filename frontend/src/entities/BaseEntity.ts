// Common properties of all entities
export interface IBaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
}

// Common response for all queries
export interface IBaseResponse<T> {
  data: T;
  loading: boolean;
  error: string;
}
