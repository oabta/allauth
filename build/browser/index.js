import {
  AllAuthApi
} from "../chunk-SSV7X6TP.js";

// src/browser/cookies.ts
function getCsrfToken() {
  const match = document.cookie.match(new RegExp("(^| )csrftoken=([^;]+)"));
  return match ? match[2] : null;
}

// src/browser/transport.ts
var AllauthTransport = class {
  constructor(config) {
    this.config = config;
  }
  config;
  async dispatch(request) {
    const url = this.config.baseUrl + request.path;
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...this.config.headers
    };
    const opts = {
      method: request.method,
      headers,
      credentials: "include"
    };
    if (request.body) {
      opts.body = JSON.stringify(request.body);
    }
    if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        opts.headers["X-CSRFToken"] = csrfToken;
      }
    }
    const response = await fetch(url, opts);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }
    return data;
  }
};
export {
  AllAuthApi,
  AllauthTransport,
  getCsrfToken
};
