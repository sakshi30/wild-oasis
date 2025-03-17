import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking, editBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useAddBooking({ isEditSession, bookingId }) {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: addBooking } = useMutation({
    mutationFn: isEditSession ? editBooking : createBooking,
    onSuccess: () => {
      if (isEditSession && bookingId) {
        toast.success("Booking edited successfully");
        queryClient.resetQueries({ queryKey: "booking" });
      } else {
        toast.success("New booking created");
      }
    },
    onError: () => {
      toast.error("Couldnot create new booking");
    },
  });
  return { isCreating, addBooking };
}

export default useAddBooking;
