import { create } from "zustand";

interface IUserStore {
  username: string | null;
  walletAddress: string | null;
  setUsername: (username: string) => void;
  setWalletAddress: (walletAddress: string) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  walletAddress: null,
  username: null,
  setUsername: (username) => set(() => ({ username })),
  setWalletAddress: (walletAddress) => set(() => ({ walletAddress })),
}));
