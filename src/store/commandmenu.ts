import { MutationTree } from "vuex";

export const state = () => ({
  open: false,
  subpage: null as string | null,
  loading: false,
  selectedOption: "animeSearch",
  searchOnly: false,
});

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
  toggle(state) {
    state.open = !state.open;
  },
  set(state, value: boolean) {
    state.open = value;
  },
  open(state) {
    state.open = true;
    state.subpage = null;
  },
  close(state) {
    state.open = false;
  },
  setSubpage(state, value: string) {
    state.subpage = value;
  },
  closeSubpage(state) {
    state.subpage = null;
  },
  setLoading(state, value: boolean) {
    state.loading = value;
  },
  finishLoading(state) {
    state.loading = false;
  },
  startLoading(state) {
    state.loading = true;
  },
  selectOption(state, value: string) {
    state.selectedOption = value;
  },
};
