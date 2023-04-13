import { MutationTree } from "vuex";

export const state = () => ({
  allowed: true,
});

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
  toggle(state) {
    state.allowed = !state.allowed;
  },
  set(state, value: boolean) {
    state.allowed = value;
  },
  allow(state) {
    state.allowed = true;
  },
  disallow(state) {
    state.allowed = false;
  },
};
