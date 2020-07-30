import { RootState, Character } from '@/store/models';

export const mutations = {
  addCharacter(state: RootState, character: Character) {
    state.characters = [...state.characters, character];
  },
  removeCharacterById(state: RootState, id: number) {
    state.characters = state.characters.filter((c: Character) => c.id !== id);
  },
};
