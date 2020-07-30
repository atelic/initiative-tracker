import Vue from 'vue';
import Vuex from 'vuex';
import { RootState } from '@/store/models';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    characters: Array<string>(),
  },
  mutations: {},
  actions: {},
  modules: {},
});
