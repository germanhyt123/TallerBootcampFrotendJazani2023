import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import "@popperjs/core"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import "./core/styles/app.scss"

import { RouterProvider } from 'react-router-dom'
import router from './core/router/index.tsx'

import { API_BASE_URL } from '@/core/constants/env';

import Axios from 'axios';
import { AxiosInterceptor } from '@/core/interceptors';

Axios.defaults.baseURL = API_BASE_URL;
AxiosInterceptor();

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
  </React.StrictMode>
)