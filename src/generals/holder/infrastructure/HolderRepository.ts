import axios, { type AxiosResponse } from 'axios';
import { HolderFilter, type HolderResponse } from '../domain';

import { API_BASE_URL } from '@/core/constants/env';
import { RequestPagination, ResponsePagination } from '@/shared/domain';

import { stringify } from 'qs';

// export const findAll = async (): Promise<AxiosResponse<HolderResponse[]>> => {
// 	const response = await axios.get<HolderResponse[]>('https://localhost:7014/api/holder');
// 	console.log(response);
// 	return response;
// };

export const findAll = async (): Promise<HolderResponse[]> => {
	// const response: HolderResponse[] = await fetch('https://localhost:7014/api/holder')
	// 	.then(async res => await res.json())
	// 	.then((res: HolderResponse[]) => res);

	// return response;

	const response: AxiosResponse<HolderResponse[]> = await axios.get<HolderResponse[]>(
		`${API_BASE_URL}/api/holder`,
	);

	return response.data;
};

export const paginatedSearch = async (
	payload: RequestPagination<HolderFilter>,
): Promise<ResponsePagination<HolderResponse>> => {
	const queryParams: string = stringify(payload, { allowDots: true });

	const response: AxiosResponse<ResponsePagination<HolderResponse>> =
		await axios.get<ResponsePagination<HolderResponse>>(`/api/holder/paginatedsearch?${queryParams}`);

	return response.data;
};
