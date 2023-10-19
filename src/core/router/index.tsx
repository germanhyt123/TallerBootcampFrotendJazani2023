import { createBrowserRouter, type RouteObject } from 'react-router-dom';
// import { lazy, Suspense } from 'react';

import Admin from '@/core/layouts/Admin';
import Home from '@/home';
import HolderSearch from '@/generals/holder/views/searchs';
import InvestmentSearch from '@/generals/Investment/views/searchs';

import Auth from '@/core/layouts/Auth';
import Login from '@/auth/login/views';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Admin />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/holder',
				element: <HolderSearch />,
			},
			{
				path:'/investment',
				element: <InvestmentSearch/>
			}
		],
	},
	{
		path: '/login',
		element: <Auth />,
		children: [
			{
				index: true,
				element: <Login />,
			},
		],
	},
];

export default createBrowserRouter(routes);
