import ReactDOM from 'react-dom/client';
import {RouterProvider, createRouter, createRootRoute, createRoute, Outlet, createHashHistory} from '@tanstack/react-router';
import {AllauthProvider} from '@oabta/allauth/react';
import {AllauthTransport} from '@oabta/allauth/browser';
import {QueryClient} from '@tanstack/react-query';
import {Login} from './Login';
import {Signup} from './Signup';
import {Dashboard} from './Dashboard';
import {VerifyEmail} from './VerifyEmail';
import {RequestPassword, ResetPassword} from './Password';
import {Auth2FA} from './Auth2FA';

const queryClient = new QueryClient();
const transport = new AllauthTransport({
  baseUrl: 'http://127.0.0.1:8000', headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const rootRoute = createRootRoute({ component: () => <Outlet /> });

const indexRoute = createRoute({getParentRoute: () => rootRoute, path: '/', component: () => <div>Home</div>});
const loginRoute = createRoute({getParentRoute: () => rootRoute, path: '/login', component: Login});
const signupRoute = createRoute({getParentRoute: () => rootRoute, path: '/signup', component: Signup});
const dashboardRoute = createRoute({getParentRoute: () => rootRoute, path: '/dashboard', component: Dashboard});
const verifyEmailRoute = createRoute({getParentRoute: () => rootRoute, path: '/verify-email', component: VerifyEmail});
const requestPasswordRoute = createRoute({getParentRoute: () => rootRoute, path: '/password/request', component: RequestPassword});
const resetPasswordRoute = createRoute({getParentRoute: () => rootRoute, path: '/password/reset', component: ResetPassword});
const auth2faRoute = createRoute({ getParentRoute: () => rootRoute, path: '/2fa', component: Auth2FA });

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, signupRoute, dashboardRoute, verifyEmailRoute, requestPasswordRoute, resetPasswordRoute, auth2faRoute]);
const history = createHashHistory();
const router = createRouter({routeTree, history});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AllauthProvider transport={transport} queryClient={queryClient}>
    <RouterProvider router={router}/>
  </AllauthProvider>
);
