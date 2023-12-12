import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CabinData } from "../../data/dto/cabins";
import { upsertCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

interface MutationFunctionProps {
  // TODO REFACTOR THIS UPSERT FUNCTION
  newCabinData: CabinData;
  id: string;
}

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ newCabinData, id }: MutationFunctionProps) =>
      upsertCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    editCabin: mutate,
    isEditingCabin: isPending,
  };
}
