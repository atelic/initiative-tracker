import { AppActionContext, Character } from './models';

export const actions = {
  addCharacter({ commit }: AppActionContext, character: Character) {
    commit('addCharacter', character);
  },
  updateCharacter({ commit }: AppActionContext, character: Character) {
    commit('updateCharacter', character);
  },
  removeCharacter({ commit }: AppActionContext, character: Character) {
    commit('removeCharacterById', character.id);
  },
  setNotes({ commit }: AppActionContext, notes: string) {
    commit('setNotes', notes);
  },
};
