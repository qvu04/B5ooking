import { PUBLIC_QUERY_KEYS } from "@/constant"
import { TLocationList } from "@/schemas";
import { locationService } from "@/services";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

export const useGetListLocation = (options?:
    Omit<UseQueryOptions<TLocationList>, "queryKey" | "queryFn">
) => {
    return useQuery({
        queryKey: [PUBLIC_QUERY_KEYS.GET_ADDRESS_LIST],
        queryFn: async () => {
            const res = await locationService.getLocationList();
            return res.data?.data?.locations;
        },
        ...options
    })
}