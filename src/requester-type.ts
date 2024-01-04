import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IRequestOption<D = any> extends AxiosRequestConfig<D> {
  successMessage?: string;
  errorMessage?: string;
}

export interface IResponse<T> extends AxiosResponse<T> {}

export interface IErrorResponseDetail {
  ctx: {
    limit_value: number;
  };
  loc: string[];
  msg: string;
  type: string;
}

export interface IErrorResponse {
  response: {
    status: number;
    data: {
      detail: IErrorResponseDetail[];
    };
  };
}

export interface IRequestEntry {
  baseURL: string;
}

export interface IGetRequestOption
  extends Omit<IRequestOption, 'method' | 'data'> {}

export interface IPostRequestOption<D>
  extends Omit<IRequestOption<D>, 'method'> {}

export interface IPutRequestOption<D>
  extends Omit<IRequestOption<D>, 'method'> {}

export interface IDeleteRequestOption<D>
  extends Omit<IRequestOption<D>, 'method'> {}
