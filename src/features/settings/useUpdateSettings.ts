import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isUpdatingSettings } = useMutation(
    {
      mutationFn: updateSettingApi,
      onSuccess: () => {
        toast.success("Settings succesfully updated");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
      onError: (error) => toast.error(error.message),
    }
  );

  return {
    updateSettings,
    isUpdatingSettings,
  };
}
