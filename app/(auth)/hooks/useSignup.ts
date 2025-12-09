import api from "@/services/api";

export const useSignup = async (name:string , email: string, password: string) => {
  const result = await api.post("/auth/signup", { name,  email, password });

  return { result: result.data };
};
