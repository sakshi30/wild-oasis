import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const { data: currentUser, isPending } = useQuery({
    queryKey: ["currentuser"],
    queryFn: getCurrentUser,
  });
  return {
    currentUser,
    isPending,
    isAuthenticated: currentUser?.role === "authenticated",
  };
}

export default useUser;
