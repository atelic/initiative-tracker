import { AppActionContext, Character } from './models';

export const actions = {
  addCharacter({ commit }: AppActionContext, character: Character) {
    commit('addCharacter', character);
  },
};
