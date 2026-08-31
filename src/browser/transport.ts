import {AllAuthConfig, AllAuthRequest, Headers} from "./types.js";
import {getCsrfToken} from "./cookies.js";


export class AllauthTransport {
  constructor(private config: AllAuthConfig) {
  }

  async dispatch<T, R>(request: AllAuthRequest<T>): Promise<R> {
    const url = this.config.baseUrl + request.path
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...this.config.headers
    };
    const opts: RequestInit = {
      method: request.method,
      headers: headers,
      credentials: 'include'
    }
    if (request.body) {
      opts.body = JSON.stringify(request.body)
    }
    if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
      const csrfToken = getCsrfToken()
      if (csrfToken) {
        (opts.headers as Headers)['X-CSRFToken'] = csrfToken
      }
    }

    const response = await fetch(url, opts)
    const data = await response.json()
    if (!response.ok) {
        throw new Error(JSON.stringify(data));
    }
    return data
  }
}
