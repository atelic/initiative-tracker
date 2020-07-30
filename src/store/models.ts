import { ActionContext } from 'vuex';

export interface RootState {
  characters: Character[];
}

export type AppActionContext = ActionContext<RootState, RootState>;

export interface Character {
  id: number;
  name: string;
  armorClass?: number;
  hp?: number;
  initiative: number;
}
