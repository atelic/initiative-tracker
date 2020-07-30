import { Character, RootState } from '@/store/models';

export const getters = {
  charactersInitiativeSorted(state: RootState): Character[] {
    return state.characters.sort((a: Character, b: Character): number => {
      if (a.initiative === b.initiative) {
        return 0;
      }
      return a.initiative > b.initiative ? -1 : 1;
    });
  },
};
