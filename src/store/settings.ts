import { MutationTree } from "vuex";

export const state = () => ({
  open: false,
  tab: "appearance",
  tabFocus: false,
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
  },
  close(state) {
    state.open = false;
  },
  setTab(state, value: string) {
    state.tab = value;
    state.tabFocus = true;
  },
  setTabFocus(state, value: boolean) {
    state.tabFocus = value;
  },
};
