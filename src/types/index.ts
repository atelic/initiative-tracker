export interface Character {
  id: string
  name: string
  armorClass?: number
  hp?: number
  maxHp?: number
  initiative: number
  isNPC?: boolean
  deathSaves?: {
    successes: number
    failures: number
  }
  conditions?: string[]
  concentration?: string
  notes?: string
}

export const CONDITIONS = [
  'Blinded',
  'Charmed',
  'Deafened',
  'Frightened',
  'Grappled',
  'Incapacitated',
  'Invisible',
  'Paralyzed',
  'Petrified',
  'Poisoned',
  'Prone',
  'Restrained',
  'Stunned',
  'Unconscious',
  'Exhaustion 1',
  'Exhaustion 2',
  'Exhaustion 3',
  'Exhaustion 4',
  'Exhaustion 5',
  'Exhaustion 6',
] as const

export type Condition = typeof CONDITIONS[number]

export interface PresetCharacter {
  name: string
  armorClass?: number
  maxHp?: number
  isNPC: boolean
}

export interface EncounterPreset {
  id: string
  name: string
  characters: PresetCharacter[]
  createdAt: number
  updatedAt: number
}

export interface EncounterState {
  characters: Character[]
  notes: string
  currentTurnIndex: number
  roundNumber: number
  presets: EncounterPreset[]
}

export type EncounterAction =
  | { type: 'ADD_CHARACTER'; payload: Character }
  | { type: 'UPDATE_CHARACTER'; payload: Character }
  | { type: 'REMOVE_CHARACTER'; payload: string }
  | { type: 'NEXT_TURN' }
  | { type: 'PREVIOUS_TURN' }
  | { type: 'SET_NOTES'; payload: string }
  | { type: 'RESET_ENCOUNTER' }
  | { type: 'SAVE_PRESET'; payload: EncounterPreset }
  | { type: 'DELETE_PRESET'; payload: string }
  | { type: 'LOAD_PRESET'; payload: { preset: EncounterPreset; mode: 'replace' | 'add' } }
  | { type: 'HYDRATE'; payload: EncounterState }
