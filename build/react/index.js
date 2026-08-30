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

// src/react/hooks/auth/useLoginMutation.ts
import { useMutation } from "@tanstack/react-query";
var useLoginMutation = () => {
  const { api, queryClient } = useAllauth();
  return useMutation({
    mutationFn: (credentials) => api.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    }
  });
};

// src/react/hooks/auth/useAuthMutations.ts
import { useMutation as useMutation2 } from "@tanstack/react-query";
var useSignupMutation = () => {
  const { api, queryClient } = useAllauth();
  return useMutation2({
    mutationFn: (data) => api.signup(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth", "session"] })
  });
};
var useLogoutMutation = () => {
  const { api, queryClient } = useAllauth();
  return useMutation2({
    mutationFn: () => api.logout(),
    onSuccess: () => queryClient.setQueryData(["auth", "session"], null)
  });
};
var useVerifyEmailMutation = () => {
  const { api } = useAllauth();
  return useMutation2({
    mutationFn: (key) => api.verifyEmail(key)
  });
};
var useRequestPasswordResetMutation = () => {
  const { api } = useAllauth();
  return useMutation2({
    mutationFn: (email) => api.requestPassword(email)
  });
};
var useResetPasswordMutation = () => {
  const { api } = useAllauth();
  return useMutation2({
    mutationFn: ({ key, password }) => api.resetPassword(key, password)
  });
};
export {
  AllauthProvider,
  useAllauth,
  useLoginMutation,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useSignupMutation,
  useVerifyEmailMutation
};
