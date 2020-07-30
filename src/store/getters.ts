import { Character, RootState } from '@/store/models';

export const getters = {
  charactersInitiativeSorted(state: RootState): Character[] {
    return state.characters.sort((a: Character, b: Character): number => {
      const initA = Number(a.initiative);
      const initB = Number(b.initiative);

      if (initA === initB) {
        return 0;
      }
      return initA > initB ? -1 : 1;
    });
  },
};
