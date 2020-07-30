import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { Character, RootState } from '@/store/models';
import { actions } from '@/store/actions';
import { mutations } from '@/store/mutations';
import { getters } from '@/store/getters';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    characters: Array<Character>(),
    notes: '',
    currentTurn: 0,
  },
  mutations,
  actions,
  getters,
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});
