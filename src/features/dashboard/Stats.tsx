import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({
  bookings,
  confirmedStays,
  cabinCount,
  numDays,
}: {
  bookings: any;
  confirmedStays: any;
  cabinCount: any;
  numDays: any;
}) {
  const numBookings = bookings?.length;

  const sales = bookings?.reduce(
    (acc: any, curr: any) => acc + curr.totalPrice,
    0
  );

  const checkins = confirmedStays?.length;

  // occupancy = number of checked in nights / numDays * total cabins
  const occupancy =
    confirmedStays?.reduce((acc: any, curr: any) => acc + curr.numNights, 0) /
    (numDays * cabinCount);

  console.log("confirmed Stays: ", confirmedStays);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}

export default Stats;
