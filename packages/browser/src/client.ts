import {AllAuthConfig, AllAuthRequest, Headers} from "@/types";
import {getCsrfToken} from "@/cookies";


export class AllauthClient {

  constructor(private config: AllAuthConfig) {
  }

  async dispatch<T, R>(request: AllAuthRequest<T>): Promise<R> {
    const url = this.config.baseUrl + request.path
    const opts: RequestInit = {
      method: request.method,
      headers: this.config.headers,
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
    return await response.json()
  }
}
