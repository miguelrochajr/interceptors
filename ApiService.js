import { BASE_URL } from './Constants';
import { store } from '../redux/store';
import axios from 'axios';

/**
 * Auxiliary class that contains all api classes
 */
class ApiService {
  static instance;
  static apiClient;

  constructor() {
    this.state = store.getState();

    ApiService.apiClient = axios.create({
      baseURL: BASE_URL,
      headers: {
        Origin: this.state.url.baseUrl,
        Referer: this.state.url.baseUrl,
      },
    });

    ApiService.apiClient.interceptors.request.use(
      this._requestInterceptor,
      this._requestInterceptorError
    );

    ApiService.apiClient.interceptors.response.use(
      this._responseInterceptor,
      this._responseInterceptorError
    );
  }

  /**
   * GETTERS
   */
  getApiClient() {
    return ApiService.apiClient;
  }

  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * REQUEST INTERCEPTORS
   */
  _requestInterceptor = async (config) => {
    let state = store.getState();
    try {
      // Getting token inside redux, if it exists we put it in the headers
      config.headers.Cookie = `
      '${state.auth.userToken.Name} = ${state.auth.userToken.Value}'
      `;

      return config;
    } catch (error) {
      return config;
    }
  };

  _requestInterceptorError = async (error) => {
    return Promise.reject(error); // Return a promise in async callback
  };

  /**
   * RESPONSE INTERCEPTORS
   */
  _responseInterceptor = async (response) => {
    // A data treatment can be done
    return response;
  };

  _responseInterceptorError = async (error) => {
    return Promise.reject(error);
  };
}

export { ApiService };
