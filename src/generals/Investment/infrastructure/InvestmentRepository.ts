import axios, { type AxiosResponse } from 'axios';
import { type InvestmentResponse } from '../domain';

import { API_BASE_URL } from '@/core/constants/env';

export const findAll = async (): Promise<InvestmentResponse[]> => {
	const response: AxiosResponse<InvestmentResponse[]> = await axios
  .get<InvestmentResponse[]>(	`${API_BASE_URL}/api/investment`);

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
