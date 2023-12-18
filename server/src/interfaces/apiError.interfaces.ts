export interface ValidationError {}

export interface IApiError {
  status: number;
  message: string;
  errors: ValidationError[];
}
