import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success(`Booking has been deleted successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Could not delete the booking");
    },
  });
  return { deleteBooking, isDeleting };
}

export default useDeleteBooking;
