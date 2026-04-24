import { create } from "zustand";
import { localStore } from "@utils/storage";

const TOKEN_KEY = "admin_token";

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  token: localStore.get<string>(TOKEN_KEY),
  setToken: token => {
    if (token) {
      localStore.set(TOKEN_KEY, token);
    } else {
      localStore.remove(TOKEN_KEY);
    }
    set({ token });
  },
  logout: () => {
    localStore.remove(TOKEN_KEY);
    set({ token: null });
  },
}));
