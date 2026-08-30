// src/browser/api.ts
var AllAuthApi = class {
  constructor(transport) {
    this.transport = transport;
  }
  transport;
  async getConfig() {
    return this.transport.dispatch({
      method: "GET",
      path: "/config"
    });
  }
  async getSession() {
    return this.transport.dispatch({
      method: "GET",
      path: "/session"
    });
  }
  async login(credentials) {
    return this.transport.dispatch({
      method: "POST",
      path: "/login",
      body: credentials
    });
  }
  async signup(data) {
    return this.transport.dispatch({
      method: "POST",
      path: "/signup",
      body: data
    });
  }
  async verifyEmail(key) {
    return this.transport.dispatch({
      method: "POST",
      path: `/verify-email`,
      body: { key }
    });
  }
  async requestPassword(email) {
    return this.transport.dispatch({
      method: "POST",
      path: "/auth/password/request",
      body: { email }
    });
  }
  async resetPassword(key, password) {
    return this.transport.dispatch({
      method: "POST",
      path: "/auth/password/reset",
      body: { key, password }
    });
  }
  async authenticate2FA(code) {
    return this.transport.dispatch({
      method: "POST",
      path: "/auth/2fa/authenticate",
      body: { code }
    });
  }
  async trustBrowser(trust) {
    return this.transport.dispatch({
      method: "POST",
      path: "/auth/2fa/trust",
      body: { trust }
    });
  }
  async requestLoginCode(data) {
    return this.transport.dispatch({
      method: "POST",
      path: "/auth/code/request",
      body: data
    });
  }
  async confirmLoginCode(code) {
    return this.transport.dispatch({
      method: "POST",
      path: "/auth/code/confirm",
      body: { code }
    });
  }
  async logout() {
    return this.transport.dispatch({
      method: "POST",
      path: "/logout"
    });
  }
};

export {
  AllAuthApi
};
