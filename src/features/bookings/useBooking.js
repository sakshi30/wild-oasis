import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

function useBooking() {
  const { bookingId } = useParams();

  const { isPending, data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });
  return { isPending, booking };
}

export default useBooking;
