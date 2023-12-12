import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookingList } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_LIMIT } from "../../utils/constants";

export function useBookingList() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  // FILTER BOOKING
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? undefined
      : { field: "status", value: filterValue };

  // SORT BOOKING
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter ?? "all", sortBy, currentPage],
    queryFn: () => getBookingList({ filter, sortBy, page: currentPage }),
  });

  // PRE-FETCH NEXT AND PREV PAGE DATA
  const totalPageCount = data?.count ? Math.ceil(data.count / PAGE_LIMIT) : 0;

  if (currentPage < totalPageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter ?? "all", sortBy, currentPage + 1],
      queryFn: () => getBookingList({ filter, sortBy, page: currentPage + 1 }),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter ?? "all", sortBy, currentPage - 1],
      queryFn: () => getBookingList({ filter, sortBy, page: currentPage - 1 }),
    });
  }
  return { isLoading, error, bookings: data };
}
