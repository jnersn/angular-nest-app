import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { BookModel } from '@common';
import { environment } from '../../environments/environment';
import { HEADERS, RequestMethod } from '../constants/api';

type T = BookModel;

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  async deleteItem(path: string, headers?: object): Promise<T> {
    const options = { headers: this._headers(headers) };
    return await this._request(RequestMethod.Delete, path, options) as T;
  }

  async getItem(path: string, headers?: object): Promise<T> {
    const options = { headers: this._headers(headers) };
    return await this._request(RequestMethod.Get, path, options) as T;
  }

  async getItems(path: string, params: Params = {}, headers?: object): Promise<T[]> {
    const options = { headers: this._headers(headers) };
    return await this._request(RequestMethod.Get, path, options, params) as T[];
  }

  async postItem(path: string, item: Partial<T>, headers?: object): Promise<T> {
    const options = { body: JSON.stringify(item), headers: this._headers(headers) };
    return await this._request(RequestMethod.Post, path, options) as T;
  }

  async putItem(path: string, item: Partial<T>, headers?: object): Promise<T> {
    const options = { body: JSON.stringify(item), headers: this._headers(headers) };
    return await this._request(RequestMethod.Put, path, options) as T;
  }

  private _headers(headers?: object): HttpHeaders {
    return new HttpHeaders(headers !== undefined ? { ...HEADERS, ...headers } : HEADERS);
  }

  private async _request(method: RequestMethod, path: string, options?: object, params?: Params): Promise<T | T[]> {
    const url = this._url(environment.app.apiUrl, path, params);
    return await this.http.request<T | T[]>(method, url, options).toPromise();
  }

  private _url(baseUrl: string, path: string, params?: object): string {
    const url: URL = new URL(`${baseUrl}/${path}`);
    if (params !== undefined) {
      url.search = new URLSearchParams(params as URLSearchParams).toString();
    }
    return url.toString();
  }
}
