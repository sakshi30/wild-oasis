import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function useCheckin() {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isUpdating, mutate: editBooking } = useMutation({
    mutationFn: (data) => updateBooking(bookingId, data),
    onSuccess: () => {
      toast.success("Booking has been successfully updated");
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      navigate("/");
    },
    onError: () => {
      toast.error("Unable to edit the booking");
    },
  });

  return { isUpdating, editBooking };
}

export default useCheckin;
