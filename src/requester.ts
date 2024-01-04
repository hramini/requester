import axios, { AxiosInstance } from 'axios';
import {
  IDeleteRequestOption,
  IErrorResponse,
  IGetRequestOption,
  IPostRequestOption,
  IPutRequestOption,
  IRequestOption,
  IResponse,
} from './requester-type';

export class Requester {
  private client: AxiosInstance;

  public constructor(baseUrl: string = '') {
    this.client = axios.create({
      baseURL: baseUrl,
    });
  }

  protected successHandler<T>(
    response: IResponse<T>,
    successMessage?: string
  ): void {
    console.log({
      response,
      successMessage,
    });
  }

  protected errorHandler(error: IErrorResponse, errorMessage?: string): void {
    console.log({
      error,
      errorMessage,
    });
  }

  private async sendRequest<T, D = any>({
    successMessage,
    errorMessage,
    ...restOptions
  }: IRequestOption<D>): Promise<IResponse<T>> {
    try {
      const response: IResponse<T> = await this.client({
        ...restOptions,
      });

      this.successHandler<T>(response, successMessage);

      return response;
    } catch (error: any) {
      this.errorHandler(error, errorMessage);

      throw error;
    }
  }

  public async get<T>(options: IGetRequestOption): Promise<IResponse<T>> {
    return this.sendRequest<T>({ method: 'GET', ...options });
  }

  public async post<T, D>(
    options: IPostRequestOption<D>
  ): Promise<IResponse<T>> {
    return this.sendRequest<T>({ method: 'POST', ...options });
  }

  public async put<T, D>(options: IPutRequestOption<D>): Promise<IResponse<T>> {
    return this.sendRequest<T>({ method: 'PUT', ...options });
  }

  public async delete<T, D>(
    options: IDeleteRequestOption<D>
  ): Promise<IResponse<T>> {
    return this.sendRequest<T>({ method: 'DELETE', ...options });
  }
}
