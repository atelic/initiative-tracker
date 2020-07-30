import { RootState, Character } from './models';

export const mutations = {
  addCharacter(state: RootState, character: Character) {
    state.characters = [...state.characters, character];
  },
};
