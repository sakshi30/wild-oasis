import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: checkoutBooking } = useMutation({
    mutationFn: (bookingId) => {
      updateBooking(bookingId, { status: "checked-out" });
    },
    onSuccess: () => {
      toast.success("Booking has been successfully updated");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Unable to edit the booking");
    },
  });

  return { isUpdating, checkoutBooking };
}

export default useCheckout;
