import axios, { type AxiosResponse } from 'axios';
import { type InvestmentResponse } from '../domain';

export const findAll = (): Promise<AxiosResponse<InvestmentResponse[]>> => {
    return axios.get<InvestmentResponse[]>('https://localhost:7014/api/investment')
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error=>{
        console.log(error);
        return error;
      }));
  };