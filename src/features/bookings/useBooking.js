import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

function useBooking({ id }) {
  const { isPending, data: booking } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });
  return { isPending, booking };
}

export default useBooking;
