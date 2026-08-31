// Primitive Types
export type Timestamp = number;
export type Email = string;
export type Username = string;
export type Password = string;
export type Code = string;
export type AuthenticatorCode = string;
export type Headers = Record<string, string>;

// OpenAPI Components
export interface ErrorResponse {
  status: number;
  errors: {
    code: string;
    message: string;
    param?: string;
  }[];
}

export interface User {
  id: number | string;
  display: string;
  has_usable_password: boolean;
  email: Email;
  username: Username;
}

export interface AuthenticationMethod {
  method: 'password' | 'password_reset' | 'code' | 'socialaccount' | 'mfa';
  at: Timestamp;
  email?: Email;
  username?: Username;
  phone?: string;
  type?: 'recovery_codes' | 'totp' | 'webauthn';
  reauthenticated?: boolean;
}

export interface Flow {
  id: 'login' | 'signup' | 'verify_email' | 'mfa_authenticate' | 'reauthenticate' | 'login_by_code';
  is_pending?: boolean;
  provider?: any;
}

export interface AuthenticationMeta {
  is_authenticated: boolean;
  session_token?: string;
  access_token?: string;
}

// API Responses
export interface AllAuthResponse<T, M = any> {
  status: number;
  data: T;
  meta?: M;
  errors?: ErrorResponse['errors'];
}

export interface AccountConfiguration {
  login_methods: ('email' | 'username')[];
  is_open_for_signup: boolean;
  email_verification_by_code_enabled: boolean;
  login_by_code_enabled: boolean;
  password_reset_by_code_enabled: boolean;
}

export interface ConfigurationResponse {
  status: number;
  data: {
    account: AccountConfiguration;
    mfa: { supported_types: string[] };
    socialaccount: { providers: any[] };
    usersessions: { track_activity: boolean };
  };
}

// Password Reset
export interface RequestPasswordRequest {
  email: Email;
}

export interface ResetPasswordRequest {
  key: string;
  password: Password;
}

export interface PasswordResetInfoResponse {
  status: number;
  data: {
    user: User;
  };
}

export interface Authenticated {
  user: User;
  methods: AuthenticationMethod[];
}

export interface AuthenticationResponseData {
  flows: Flow[];
}

export type AuthenticatedResponse = AllAuthResponse<Authenticated, AuthenticationMeta>;
export type AuthenticationResponse = AllAuthResponse<AuthenticationResponseData, AuthenticationMeta>;

// Request bodies
export interface LoginRequest {
  password: Password;
  username?: Username;
  email?: Email;
  phone?: string;
}

export interface SignupRequest {
  email?: Email;
  phone?: string;
  username?: Username;
  password?: Password;
}

export interface VerifyEmailRequest {
  key: string;
}

export interface ReauthenticateRequest {
  password: Password;
}

// 2FA / Login By Code
export interface MFAAuthenticateRequest {
  code: string;
}

export interface MFATrustRequest {
  trust: boolean;
}

export interface RequestLoginCodeRequest {
  email?: Email;
  phone?: string;
}

export interface ConfirmLoginCodeRequest {
  code: Code;
}

// Internal structures
export interface AllAuthConfig {
  baseUrl: string;
  headers?: Headers;
}

export interface AllAuthRequest<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: T;
}
