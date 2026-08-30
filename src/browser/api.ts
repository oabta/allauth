import {AllauthTransport} from "./transport";
import {
  AuthenticatedResponse,
  AuthenticationResponse,
  LoginRequest,
  SignupRequest,
  VerifyEmailRequest,
  ConfigurationResponse,
  RequestPasswordRequest,
  ResetPasswordRequest,
  MFAAuthenticateRequest,
  MFATrustRequest,
  RequestLoginCodeRequest,
  ConfirmLoginCodeRequest
} from "./types.js";

export class AllAuthApi {
  constructor(private transport: AllauthTransport) {}

  async getConfig() {
    return this.transport.dispatch<null, ConfigurationResponse>({
      method: "GET",
      path: "/config"
    });
  }

  async getSession() {
    return this.transport.dispatch<null, AuthenticatedResponse | AuthenticationResponse>({
      method: "GET",
      path: "/session"
    });
  }

  async login(credentials: LoginRequest) {
    return this.transport.dispatch<LoginRequest, AuthenticatedResponse | AuthenticationResponse>({
      method: "POST",
      path: "/login",
      body: credentials
    });
  }

  async signup(data: SignupRequest) {
    return this.transport.dispatch<SignupRequest, AuthenticatedResponse | AuthenticationResponse>({
      method: "POST",
      path: "/signup",
      body: data
    });
  }

  async verifyEmail(key: string) {
    return this.transport.dispatch<VerifyEmailRequest, AuthenticatedResponse | AuthenticationResponse>({
      method: "POST",
      path: `/verify-email`,
      body: { key }
    });
  }

  async requestPassword(email: string) {
      return this.transport.dispatch<RequestPasswordRequest, any>({
          method: "POST",
          path: "/auth/password/request",
          body: { email }
      })
  }

  async resetPassword(key: string, password: string) {
      return this.transport.dispatch<ResetPasswordRequest, AuthenticatedResponse | AuthenticationResponse>({
          method: "POST",
          path: "/auth/password/reset",
          body: { key, password }
      })
  }

  async authenticate2FA(code: string) {
    return this.transport.dispatch<MFAAuthenticateRequest, AuthenticatedResponse>({
      method: "POST",
      path: "/auth/2fa/authenticate",
      body: { code }
    });
  }

  async trustBrowser(trust: boolean) {
    return this.transport.dispatch<MFATrustRequest, AuthenticatedResponse>({
      method: "POST",
      path: "/auth/2fa/trust",
      body: { trust }
    });
  }

  async requestLoginCode(data: RequestLoginCodeRequest) {
    return this.transport.dispatch<RequestLoginCodeRequest, any>({
      method: "POST",
      path: "/auth/code/request",
      body: data
    });
  }

  async confirmLoginCode(code: string) {
    return this.transport.dispatch<ConfirmLoginCodeRequest, AuthenticatedResponse>({
      method: "POST",
      path: "/auth/code/confirm",
      body: { code }
    });
  }

  async logout() {
    return this.transport.dispatch<null, any>({
      method: "POST",
      path: "/logout"
    });
  }
}
