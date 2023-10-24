import axios, { type AxiosResponse } from 'axios';
import { type InvestmentFilter, type InvestmentResponse, type InvestmentRequest } from '../domain';

import { API_BASE_URL } from '@/core/constants/env';
import { type RequestPagination, type ResponsePagination } from '@/shared/domain';
import { stringify } from 'qs';

export const findAll = async (): Promise<InvestmentResponse[]> => {
	const response: AxiosResponse<InvestmentResponse[]> = await axios.get<InvestmentResponse[]>(
		`${API_BASE_URL}/api/investment`,
	);

	return response.data;
};

// export const findAll = (): Promise<AxiosResponse<InvestmentResponse[]>> => {
//     return axios.get<InvestmentResponse[]>(`${API_BASE_URL}/api/investment`)
//       .then((response) => {
//         console.log(response);
//         return response;
//       })
//       .catch((error=>{
//         console.log(error);
//         return error;
//       }));
//   };

export const findById = async (id: number): Promise<InvestmentResponse> => {
	const response: AxiosResponse<InvestmentResponse> = await axios.get<InvestmentResponse>(
		`${API_BASE_URL}/api/investment/${id}`,
	);

	return response.data;
};

export const paginatedSearch = async (
	payload: RequestPagination<InvestmentFilter>,
): Promise<ResponsePagination<InvestmentResponse>> => {
	const queryParams: string = stringify(payload, { allowDots: true });

	const response: AxiosResponse<ResponsePagination<InvestmentResponse>> = await axios.get<
		ResponsePagination<InvestmentResponse>
	>(`${API_BASE_URL}/api/investment/paginatedsearch?${queryParams}`);

	return response.data;
};

// 'https://localhost:7014/api/investment/paginatedsearch?Page=1&PerPage=5&Filter.Description=s&Filter.Year=2023&Filter.Monthname=e' \

export const create = async (payload: InvestmentRequest): Promise<InvestmentResponse> => {
	const response: AxiosResponse<InvestmentResponse> = await axios.post<InvestmentResponse>(
		`${API_BASE_URL}/api/investment`,
		payload,
	);

	return response.data;
};

export const edit = async (payload: InvestmentRequest, id: number): Promise<InvestmentResponse> => {
	const response: AxiosResponse<InvestmentResponse> = await axios.put<InvestmentResponse>(
		`${API_BASE_URL}/api/investment/${id}`,
		payload,
	);

	return response.data;
};

export const remove = async (id: number): Promise<InvestmentResponse> => {
	const response: AxiosResponse<InvestmentResponse> = await axios.delete<InvestmentResponse>(
		`${API_BASE_URL}/api/investment/${id}`,
	);

	return response.data;
};
