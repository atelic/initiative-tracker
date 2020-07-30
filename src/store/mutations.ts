import { RootState, Character } from '@/store/models';

export const mutations = {
  addCharacter(state: RootState, character: Character) {
    state.characters = [...state.characters, character];
    if (state.currentTurn > state.characters.length) {
      const newTurn =
        state.characters.length === 0 ? 0 : state.characters.length - 1;
      state.currentTurn = newTurn;
    }
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
    if (state.currentTurn > state.characters.length) {
      const newTurn =
        state.characters.length === 0 ? 0 : state.characters.length - 1;
      state.currentTurn = newTurn;
    }
  },
  setNotes(state: RootState, notes: string) {
    state.notes = notes;
  },
  setCurrentTurn(state: RootState, currentTurn: number) {
    state.currentTurn = currentTurn;
  },
};
