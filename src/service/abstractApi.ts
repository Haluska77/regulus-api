import { AxiosResponse } from 'axios';
import { LoginService } from './loginService.js';
import { host } from '../config/config.js';
import axiosInstance from '../config/axiosConfig.js';

export abstract class AbstractApi<T> {
  abstract page: string;

  fetch(): Promise<T> {
    return this.execute(() => this.fetchImpl(this.page));
  }

  fetchImpl(page: string): Promise<AxiosResponse> {
    const apiUrl = `${host}${page}`;
    return axiosInstance.get(apiUrl);
  }

  async execute(operation: () => Promise<AxiosResponse>): Promise<T> {
    const response = await operation();
    if (response.status === 200) {
      return this.getResponse(response.data);
    }
    console.log('Redirect detected, re-authenticating...');
    LoginService.successLogin(response);
    return this.fetch();
  }

  abstract getResponse(data: string): Promise<T>;
}
