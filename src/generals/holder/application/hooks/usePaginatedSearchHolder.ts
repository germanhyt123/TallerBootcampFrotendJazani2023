
import { type ResponsePagination, type RequestPagination } from '@/shared/domain';
import {type UseQueryResult,useQuery} from '@tanstack/react-query';
import { PAGINATE_SEARCH } from './QueryKeys';
import { type HolderFilter, type HolderResponse } from '../../domain';
import { HolderRepository } from '../../infrastructure';

const usePaginatedSearchHolder=(
    searchFilter: RequestPagination<HolderFilter>
):UseQueryResult<ResponsePagination<HolderResponse>,Error>=>{

    return useQuery({
        queryKey:[PAGINATE_SEARCH,searchFilter],
        queryFn:async () => await HolderRepository.paginatedSearch(searchFilter),
        retry:0,
        refetchOnWindowFocus:false,
    });
    
};

export default usePaginatedSearchHolder;