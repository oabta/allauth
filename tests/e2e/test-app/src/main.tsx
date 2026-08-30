import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { AllauthProvider } from '@oabta/allauth/react';
import { AllauthTransport } from '@oabta/allauth/browser';
import { QueryClient } from '@tanstack/react-query';
import { Login } from './Login';
import { Signup } from './Signup';
import { Dashboard } from './Dashboard';

const queryClient = new QueryClient();
const transport = new AllauthTransport({ baseUrl: 'http://127.0.0.1:8000' });

const rootRoute = createRootRoute({ component: Outlet });
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: () => <div>Home</div> });
const loginRoute = createRoute({ getParentRoute: () => rootRoute, path: '/login', component: Login });
const signupRoute = createRoute({ getParentRoute: () => rootRoute, path: '/signup', component: Signup });
const dashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dashboard', component: Dashboard });

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, signupRoute, dashboardRoute]);
const router = createRouter({ routeTree });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AllauthProvider transport={transport} queryClient={queryClient}>
    <RouterProvider router={router} />
  </AllauthProvider>
);
