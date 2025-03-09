import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

/* eslint-disable react/prop-types */
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkins = confirmedStays.length;
  const checkinnights = confirmedStays.reduce(
    (acc, curr) => acc + curr.numNights,
    0
  );
  console.log(checkinnights);
  const occupanyRate = checkinnights / (numDays * cabinCount);
  return (
    <>
      <Stat
        title={"Bookings"}
        icon={<HiOutlineBriefcase />}
        color={"blue"}
        value={numBookings}
      />
      <Stat
        title={"Sales"}
        icon={<HiOutlineBanknotes />}
        color={"green"}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"Check ins"}
        icon={<HiOutlineCalendarDays />}
        color={"yellow"}
        value={checkins}
      />
      <Stat
        title={"Occupany Rate"}
        icon={<HiOutlineChartBar />}
        color={"indigo"}
        value={Math.round(occupanyRate * 100) + "%"}
      />
    </>
  );
}

export default Stats;
