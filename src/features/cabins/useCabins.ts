import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
    staleTime: 0,
  });

  return {
    isLoading,
    cabins: data,
    error,
  };
}
