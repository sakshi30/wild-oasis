import { useQuery } from "@tanstack/react-query";
import { getAllGuests } from "../../services/apiGuests";

function useGuests() {
  const { data: guests, isPending: isRetrievingGuests } = useQuery({
    queryKey: ["guests"],
    queryFn: getAllGuests,
  });
  return { guests, isRetrievingGuests };
}

export default useGuests;
