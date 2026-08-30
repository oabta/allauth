type Timestamp = number;
type Email = string;
type Username = string;
type Password = string;
type Code = string;
type AuthenticatorCode = string;
type Headers = Record<string, string>;
interface ErrorResponse {
    status: number;
    errors: {
        code: string;
        message: string;
        param?: string;
    }[];
}
interface User {
    id: number | string;
    display: string;
    has_usable_password: boolean;
    email: Email;
    username: Username;
}
interface AuthenticationMethod {
    method: 'password' | 'password_reset' | 'code' | 'socialaccount' | 'mfa';
    at: Timestamp;
    email?: Email;
    username?: Username;
    phone?: string;
    type?: 'recovery_codes' | 'totp' | 'webauthn';
    reauthenticated?: boolean;
}
interface Flow {
    id: 'login' | 'signup' | 'verify_email' | 'mfa_authenticate' | 'reauthenticate' | 'login_by_code';
    is_pending?: boolean;
    provider?: any;
}
interface AuthenticationMeta {
    is_authenticated: boolean;
    session_token?: string;
    access_token?: string;
}
interface AllAuthResponse<T, M = any> {
    status: number;
    data: T;
    meta?: M;
    errors?: ErrorResponse['errors'];
}
interface AccountConfiguration {
    login_methods: ('email' | 'username')[];
    is_open_for_signup: boolean;
    email_verification_by_code_enabled: boolean;
    login_by_code_enabled: boolean;
    password_reset_by_code_enabled: boolean;
}
interface ConfigurationResponse {
    status: number;
    data: {
        account: AccountConfiguration;
        mfa: {
            supported_types: string[];
        };
        socialaccount: {
            providers: any[];
        };
        usersessions: {
            track_activity: boolean;
        };
    };
}
interface RequestPasswordRequest {
    email: Email;
}
interface ResetPasswordRequest {
    key: string;
    password: Password;
}
interface PasswordResetInfoResponse {
    status: number;
    data: {
        user: User;
    };
}
interface Authenticated {
    user: User;
    methods: AuthenticationMethod[];
}
interface AuthenticationResponseData {
    flows: Flow[];
}
type AuthenticatedResponse = AllAuthResponse<Authenticated, AuthenticationMeta>;
type AuthenticationResponse = AllAuthResponse<AuthenticationResponseData, AuthenticationMeta>;
interface LoginRequest {
    password: Password;
    username?: Username;
    email?: Email;
    phone?: string;
}
interface SignupRequest {
    email?: Email;
    phone?: string;
    username?: Username;
    password?: Password;
}
interface VerifyEmailRequest {
    key: string;
}
interface ReauthenticateRequest {
    password: Password;
}
interface MFAAuthenticateRequest {
    code: string;
}
interface MFATrustRequest {
    trust: boolean;
}
interface RequestLoginCodeRequest {
    email?: Email;
    phone?: string;
}
interface ConfirmLoginCodeRequest {
    code: Code;
}
interface AllAuthConfig {
    baseUrl: string;
    headers: Headers;
}
interface AllAuthRequest<T> {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    body?: T;
}

declare class AllauthTransport {
    private config;
    constructor(config: AllAuthConfig);
    dispatch<T, R>(request: AllAuthRequest<T>): Promise<R>;
}

declare class AllAuthApi {
    private transport;
    constructor(transport: AllauthTransport);
    getConfig(): Promise<ConfigurationResponse>;
    getSession(): Promise<AuthenticatedResponse | AuthenticationResponse>;
    login(credentials: LoginRequest): Promise<AuthenticatedResponse | AuthenticationResponse>;
    signup(data: SignupRequest): Promise<AuthenticatedResponse | AuthenticationResponse>;
    verifyEmail(key: string): Promise<AuthenticatedResponse | AuthenticationResponse>;
    requestPassword(email: string): Promise<any>;
    resetPassword(key: string, password: string): Promise<AuthenticatedResponse | AuthenticationResponse>;
    authenticate2FA(code: string): Promise<AuthenticatedResponse>;
    trustBrowser(trust: boolean): Promise<AuthenticatedResponse>;
    requestLoginCode(data: RequestLoginCodeRequest): Promise<any>;
    confirmLoginCode(code: string): Promise<AuthenticatedResponse>;
    logout(): Promise<any>;
}

export { type AccountConfiguration as A, type Code as C, type Email as E, type Flow as F, type Headers as H, type LoginRequest as L, type MFAAuthenticateRequest as M, type Password as P, type ReauthenticateRequest as R, type SignupRequest as S, type Timestamp as T, type User as U, type VerifyEmailRequest as V, AllAuthApi as a, type AllAuthConfig as b, type AllAuthRequest as c, type AllAuthResponse as d, AllauthTransport as e, type Authenticated as f, type AuthenticatedResponse as g, type AuthenticationMeta as h, type AuthenticationMethod as i, type AuthenticationResponse as j, type AuthenticationResponseData as k, type AuthenticatorCode as l, type ConfigurationResponse as m, type ConfirmLoginCodeRequest as n, type ErrorResponse as o, type MFATrustRequest as p, type PasswordResetInfoResponse as q, type RequestLoginCodeRequest as r, type RequestPasswordRequest as s, type ResetPasswordRequest as t, type Username as u };
