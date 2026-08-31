import * as react from '../react';
import { ReactNode } from '../react';
import * as _tanstack_react_query from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { e as AllauthTransport, a as AllAuthApi, g as AuthenticatedResponse, j as AuthenticationResponse, S as SignupRequest, m as ConfigurationResponse } from '../api-3edLcVcU.js';
import * as _tanstack_react_form from '@tanstack/react-form';
import * as _tanstack_form_core from '@tanstack/form-core';

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

declare const useSignupMutation: () => _tanstack_react_query.UseMutationResult<AuthenticatedResponse | AuthenticationResponse, Error, SignupRequest, unknown>;
declare const useLoginMutation: () => _tanstack_react_query.UseMutationResult<AuthenticatedResponse | AuthenticationResponse, Error, any, unknown>;
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

declare const useSignupForm: (onSuccess?: () => void) => {
    form: _tanstack_react_form.ReactFormExtendedApi<{
        username: string;
        email: string;
        password: string;
    }, _tanstack_form_core.FormValidateOrFn<{
        username: string;
        email: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormValidateOrFn<{
        username: string;
        email: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormAsyncValidateOrFn<{
        username: string;
        email: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormValidateOrFn<{
        username: string;
        email: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormAsyncValidateOrFn<{
        username: string;
        email: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormValidateOrFn<{
        username: string;
        email: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormAsyncValidateOrFn<{
        username: string;
        email: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormValidateOrFn<{
        username: string;
        email: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormAsyncValidateOrFn<{
        username: string;
        email: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormAsyncValidateOrFn<{
        username: string;
        email: string;
        password: string;
    }> | undefined, unknown>;
    signup: _tanstack_react_query.UseMutationResult<AuthenticatedResponse | AuthenticationResponse, Error, SignupRequest, unknown>;
};

declare const useLoginForm: (onSuccess?: () => void) => {
    form: _tanstack_react_form.ReactFormExtendedApi<{
        username: string;
        password: string;
    }, _tanstack_form_core.FormValidateOrFn<{
        username: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormValidateOrFn<{
        username: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormAsyncValidateOrFn<{
        username: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormValidateOrFn<{
        username: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormAsyncValidateOrFn<{
        username: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormValidateOrFn<{
        username: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormAsyncValidateOrFn<{
        username: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormValidateOrFn<{
        username: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormAsyncValidateOrFn<{
        username: string;
        password: string;
    }> | undefined, _tanstack_form_core.FormAsyncValidateOrFn<{
        username: string;
        password: string;
    }> | undefined, unknown>;
    login: _tanstack_react_query.UseMutationResult<AuthenticatedResponse | AuthenticationResponse, Error, any, unknown>;
};

export { AllauthProvider, useAllauth, useAuthenticate2FAMutation, useConfig, useConfirmLoginCodeMutation, useLoginForm, useLoginMutation, useLogoutMutation, useRequestLoginCodeMutation, useRequestPasswordResetMutation, useResetPasswordMutation, useSignupForm, useSignupMutation, useTrustBrowserMutation, useVerifyEmailMutation };
