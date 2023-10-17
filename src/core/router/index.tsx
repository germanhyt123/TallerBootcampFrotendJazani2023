import { createBrowserRouter, type RouteObject } from 'react-router-dom';
// import { lazy, Suspense } from 'react';

import Admin from '../layouts/Admin';
import Home from '../../home';
import HolderSearch from '../../generals/holder/views/searchs';
import InvestmentSearch from '../../generals/Investment/views/searchs';

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
];

export default createBrowserRouter(routes);
