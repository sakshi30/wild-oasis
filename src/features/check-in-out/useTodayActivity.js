import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { data: todayData, isPending: isLoading } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });
  return { todayData, isLoading };
}

export default useTodayActivity;
