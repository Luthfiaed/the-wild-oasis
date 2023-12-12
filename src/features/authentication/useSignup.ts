import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      toast.success(
        "Account successfully created. Please verify from email address"
      );
    },
  });

  return { signUp, isSigningUp };
}
