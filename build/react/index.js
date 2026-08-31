import {
  AllAuthApi
} from "../chunk-SSV7X6TP.js";

// src/react/context/AllauthProvider.tsx
import { createContext, useContext, useMemo } from "../react";
import { QueryClientProvider } from "@tanstack/react-query";
import { jsx } from "react/jsx-runtime";
var AllauthContext = createContext(null);
var AllauthProvider = ({
  transport,
  queryClient,
  children
}) => {
  const api = useMemo(() => new AllAuthApi(transport), [transport]);
  return /* @__PURE__ */ jsx(AllauthContext.Provider, { value: { api, queryClient }, children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children }) });
};
var useAllauth = () => {
  const context = useContext(AllauthContext);
  if (!context) throw new Error("useAllauth must be used within AllauthProvider");
  return context;
};

// src/react/hooks/auth/useAuthMutations.ts
import { useMutation } from "@tanstack/react-query";
var useSignupMutation = () => {
  const { api, queryClient } = useAllauth();
  return useMutation({
    mutationFn: (data) => api.signup(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth", "session"] })
  });
};
var useLoginMutation = () => {
  const { api, queryClient } = useAllauth();
  return useMutation({
    mutationFn: (data) => api.login(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth", "session"] })
  });
};
var useLogoutMutation = () => {
  const { api, queryClient } = useAllauth();
  return useMutation({
    mutationFn: () => api.logout(),
    onSuccess: () => queryClient.setQueryData(["auth", "session"], null)
  });
};
var useVerifyEmailMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (key) => api.verifyEmail(key)
  });
};
var useRequestPasswordResetMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (email) => api.requestPassword(email)
  });
};
var useResetPasswordMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: ({ key, password }) => api.resetPassword(key, password)
  });
};
var useAuthenticate2FAMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (code) => api.authenticate2FA(code)
  });
};
var useTrustBrowserMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (trust) => api.trustBrowser(trust)
  });
};
var useRequestLoginCodeMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (data) => api.requestLoginCode(data)
  });
};
var useConfirmLoginCodeMutation = () => {
  const { api } = useAllauth();
  return useMutation({
    mutationFn: (code) => api.confirmLoginCode(code)
  });
};

// src/react/hooks/auth/useConfig.ts
import { useQuery } from "@tanstack/react-query";
var useConfig = () => {
  const { api } = useAllauth();
  return useQuery({
    queryKey: ["auth", "config"],
    queryFn: () => api.getConfig(),
    staleTime: 1e3 * 60 * 60
    // Cache for 1 hour
  });
};

// src/react/hooks/auth/useSignupForm.ts
import { useForm } from "@tanstack/react-form";
var useSignupForm = (onSuccess) => {
  const signup = useSignupMutation();
  const form = useForm({
    defaultValues: { username: "", email: "", password: "" },
    onSubmit: async ({ value }) => {
      signup.mutate(value, { onSuccess });
    }
  });
  return { form, signup };
};

// src/react/hooks/auth/useLoginForm.ts
import { useForm as useForm2 } from "@tanstack/react-form";
var useLoginForm = (onSuccess) => {
  const login = useLoginMutation();
  const form = useForm2({
    defaultValues: { username: "", password: "" },
    onSubmit: async ({ value }) => {
      login.mutate(value, { onSuccess });
    }
  });
  return { form, login };
};
export {
  AllauthProvider,
  useAllauth,
  useAuthenticate2FAMutation,
  useConfig,
  useConfirmLoginCodeMutation,
  useLoginForm,
  useLoginMutation,
  useLogoutMutation,
  useRequestLoginCodeMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useSignupForm,
  useSignupMutation,
  useTrustBrowserMutation,
  useVerifyEmailMutation
};
