import { create } from "zustand";

type Store = {
  searchedWord: string;
  shouldSearch: boolean;
};

type Actions = {
  setSearchedWord: (searchedWord: string) => void;
  setShouldSearch: (shouldSearch: boolean) => void;
};

const useStore = create<Store & Actions>((set) => ({
  searchedWord: "",
  shouldSearch: false,
  setSearchedWord: (searchedWord) => set({ searchedWord }),
  setShouldSearch: (shouldSearch) => set({ shouldSearch }),
}));

export default useStore;
