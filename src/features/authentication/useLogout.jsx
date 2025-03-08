import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutapi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutapi,
    onSuccess: () => {
      toast.success("User is logged out successfully");
      navigate("/login", { replace: true });
      queryClient.invalidateQueries(["currentuser"]);
    },
    onError: () => {
      toast.error("Unable to logout user");
    },
  });

  return { logout, isLoggingOut };
}

export default useLogout;
