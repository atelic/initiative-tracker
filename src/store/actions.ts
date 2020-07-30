import { AppActionContext, Character } from './models';

export const actions = {
  addCharacter({ commit }: AppActionContext, character: Character) {
    commit('addCharacter', character);
  },
  removeCharacter({ commit }: AppActionContext, character: Character) {
    commit('removeCharacterById', character.id);
  },
};
