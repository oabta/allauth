import {AllauthClient} from "./client.js";
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
  constructor(private client: AllauthClient) {}

  async getConfig() {
    return this.client.dispatch<null, ConfigurationResponse>({
      method: "GET",
      path: "/config"
    });
  }

  async getSession() {
    return this.client.dispatch<null, AuthenticatedResponse | AuthenticationResponse>({
      method: "GET",
      path: "/session"
    });
  }

  async login(credentials: LoginRequest) {
    return this.client.dispatch<LoginRequest, AuthenticatedResponse | AuthenticationResponse>({
      method: "POST",
      path: "/login",
      body: credentials
    });
  }

  async signup(data: SignupRequest) {
    return this.client.dispatch<SignupRequest, AuthenticatedResponse | AuthenticationResponse>({
      method: "POST",
      path: "/signup",
      body: data
    });
  }

  async verifyEmail(key: string) {
    return this.client.dispatch<VerifyEmailRequest, AuthenticatedResponse | AuthenticationResponse>({
      method: "POST",
      path: `/verify-email`,
      body: { key }
    });
  }

  async requestPassword(email: string) {
      return this.client.dispatch<RequestPasswordRequest, any>({
          method: "POST",
          path: "/auth/password/request",
          body: { email }
      })
  }

  async resetPassword(key: string, password: string) {
      return this.client.dispatch<ResetPasswordRequest, AuthenticatedResponse | AuthenticationResponse>({
          method: "POST",
          path: "/auth/password/reset",
          body: { key, password }
      })
  }

  async authenticate2FA(code: string) {
    return this.client.dispatch<MFAAuthenticateRequest, AuthenticatedResponse>({
      method: "POST",
      path: "/auth/2fa/authenticate",
      body: { code }
    });
  }

  async trustBrowser(trust: boolean) {
    return this.client.dispatch<MFATrustRequest, AuthenticatedResponse>({
      method: "POST",
      path: "/auth/2fa/trust",
      body: { trust }
    });
  }

  async requestLoginCode(data: RequestLoginCodeRequest) {
    return this.client.dispatch<RequestLoginCodeRequest, any>({
      method: "POST",
      path: "/auth/code/request",
      body: data
    });
  }

  async confirmLoginCode(code: string) {
    return this.client.dispatch<ConfirmLoginCodeRequest, AuthenticatedResponse>({
      method: "POST",
      path: "/auth/code/confirm",
      body: { code }
    });
  }

  async logout() {
    return this.client.dispatch<null, any>({
      method: "POST",
      path: "/logout"
    });
  }
}
