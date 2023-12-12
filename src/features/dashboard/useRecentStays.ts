import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

/* STAYS == BOOKINGS THAT HAVE ACTUALLY CHECKED IN */
export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  // TODO revisit query ini filter di level supabase-nya aja bisa gak
  const confirmedStays = data?.filter(
    (data) => data.status === "checked-in" || data.status === "checked-out"
  );

  return { confirmedStays, isLoading, numDays };
}
