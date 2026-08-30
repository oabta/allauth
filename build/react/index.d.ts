import * as react from '../react';
import { ReactNode } from '../react';
import * as _tanstack_react_query from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { e as AllauthTransport, a as AllAuthApi, g as AuthenticatedResponse, j as AuthenticationResponse, L as LoginRequest, S as SignupRequest, m as ConfigurationResponse } from '../api-3edLcVcU.js';

interface AllauthContextValue {
    api: AllAuthApi;
    queryClient: QueryClient;
}
declare const AllauthProvider: ({ transport, queryClient, children }: {
    transport: AllauthTransport;
    queryClient: QueryClient;
    children: ReactNode;
}) => react.JSX.Element;
declare const useAllauth: () => AllauthContextValue;

declare const useLoginMutation: () => _tanstack_react_query.UseMutationResult<AuthenticatedResponse | AuthenticationResponse, Error, LoginRequest, unknown>;

declare const useSignupMutation: () => _tanstack_react_query.UseMutationResult<AuthenticatedResponse | AuthenticationResponse, Error, SignupRequest, unknown>;
declare const useLogoutMutation: () => _tanstack_react_query.UseMutationResult<any, Error, void, unknown>;
declare const useVerifyEmailMutation: () => _tanstack_react_query.UseMutationResult<AuthenticatedResponse | AuthenticationResponse, Error, string, unknown>;
declare const useRequestPasswordResetMutation: () => _tanstack_react_query.UseMutationResult<any, Error, string, unknown>;
declare const useResetPasswordMutation: () => _tanstack_react_query.UseMutationResult<AuthenticatedResponse | AuthenticationResponse, Error, {
    key: string;
    password: string;
}, unknown>;
declare const useAuthenticate2FAMutation: () => _tanstack_react_query.UseMutationResult<AuthenticatedResponse, Error, string, unknown>;
declare const useTrustBrowserMutation: () => _tanstack_react_query.UseMutationResult<AuthenticatedResponse, Error, boolean, unknown>;
declare const useRequestLoginCodeMutation: () => _tanstack_react_query.UseMutationResult<any, Error, any, unknown>;
declare const useConfirmLoginCodeMutation: () => _tanstack_react_query.UseMutationResult<AuthenticatedResponse, Error, string, unknown>;

declare const useConfig: () => _tanstack_react_query.UseQueryResult<ConfigurationResponse, Error>;

export { AllauthProvider, useAllauth, useAuthenticate2FAMutation, useConfig, useConfirmLoginCodeMutation, useLoginMutation, useLogoutMutation, useRequestLoginCodeMutation, useRequestPasswordResetMutation, useResetPasswordMutation, useSignupMutation, useTrustBrowserMutation, useVerifyEmailMutation };
