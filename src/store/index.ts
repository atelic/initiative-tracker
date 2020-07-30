import Vue from 'vue';
import Vuex from 'vuex';
import { Character, RootState } from '@/store/models';
import { actions } from '@/store/actions';
import { mutations } from '@/store/mutations';
import { getters } from '@/store/getters';

Vue.use(Vuex);

const characters: Character[] = [
  { name: 'Chaya', armorClass: 13, hp: 39, initiative: 17 },
  { name: 'Coniglia', armorClass: 16, hp: 38, initiative: 2 },
  { name: 'Leroy', armorClass: 17, hp: 59, initiative: 13 },
];

export default new Vuex.Store<RootState>({
  state: {
    characters, // Array<string>(),
  },
  mutations,
  actions,
  getters,
});
