import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin, editCabin } from "../../services/apiCabins";

export function useCreateCabin({ isEditSession }) {
  console.log(isEditSession);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: isEditSession ? editCabin : createCabin,
    onSuccess: () => {
      toast.success(
        `Cabin ${isEditSession ? "edited" : "created"} successfully`
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: () => {
      toast.error(`Unable to ${isEditSession ? "edit" : "create"} cabin`);
    },
  });

  return { mutate, isPending };
}
