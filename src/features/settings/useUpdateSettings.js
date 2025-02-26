import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingSetting, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting has been updated");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: () => {
      toast.error("Unable to update the setting");
    },
  });

  return { isUpdatingSetting, updateSetting };
}
