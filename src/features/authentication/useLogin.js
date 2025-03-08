import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { isPending: isLoggingIn, mutate: loginUser } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(["currentuser"], user.user);
      toast.success("User logged in successfully");
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Invalid username or password");
    },
  });
  return { isLoggingIn, loginUser };
}

export default useLogin;
