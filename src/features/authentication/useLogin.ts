import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),

    onSuccess: (userData) => {
      queryClient.setQueryData("user" as unknown as QueryKey, userData.user);
      navigate("/dashboard"); // cek kenapa kalo dikasih replace: true dia gak mau navigate
    },

    onError: (error) => {
      console.log("Login error: ", error.message);
      toast.error("Error Log In");
    },
  });

  return { login, isLoggingIn };
}
