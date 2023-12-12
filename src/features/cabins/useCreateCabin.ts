import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { upsertCabin } from "../../services/apiCabins";
import { CabinData } from "../../data/dto/cabins";

interface MutationFunctionProps {
  newCabinData: CabinData;
  id: string;
}

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ newCabinData, id }: MutationFunctionProps) =>
      upsertCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    createCabin: mutate,
    isCreatingCabin: isPending,
  };
}
