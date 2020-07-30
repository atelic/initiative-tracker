import { RootState, Character } from '@/store/models';

export const mutations = {
  addCharacter(state: RootState, character: Character) {
    state.characters = [...state.characters, character];
  },
  updateCharacter(state: RootState, character: Character) {
    const index = state.characters.findIndex(
      (c: Character) => c.id === character.id
    );

    if (!index) {
      return;
    }

    state.characters[index] = character;
  },
  removeCharacterById(state: RootState, id: number) {
    state.characters = state.characters.filter((c: Character) => c.id !== id);
  },
  setNotes(state: RootState, notes: string) {
    state.notes = notes;
  },
};
