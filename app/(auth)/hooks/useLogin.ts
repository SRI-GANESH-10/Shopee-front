import api from "@/services/api";

export const useLogin = async (email: string, password: string) => {
  const result = await api.post("/auth/login", { email, password });

  return { result: result.data };
};
