import axios, { type AxiosResponse } from 'axios';
import { type HolderResponse } from '../domain';

export const findAll = async (): Promise<AxiosResponse<HolderResponse[]>> => {
	const response = await axios.get<HolderResponse[]>('https://localhost:7014/api/holder');
	console.log(response);
	return response;
};
