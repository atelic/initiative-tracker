import type { EncounterState, EncounterAction, Character } from '../types/index.ts'

export const initialState: EncounterState = {
  characters: [],
  notes: '',
  currentTurnIndex: 0,
  roundNumber: 1,
  presets: [],
}

export function getSortedCharacters(characters: Character[]): Character[] {
  return [...characters].sort((a, b) => b.initiative - a.initiative)
}

function reduceEncounter(state: EncounterState, action: EncounterAction): EncounterState {
  switch (action.type) {
    case 'ADD_CHARACTER':
      return {
        ...state,
        characters: [...state.characters, action.payload],
      }

    case 'UPDATE_CHARACTER':
      return {
        ...state,
        characters: state.characters.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      }

    case 'REMOVE_CHARACTER': {
      const newCharacters = state.characters.filter((c) => c.id !== action.payload)
      const sortedOld = getSortedCharacters(state.characters)
      const removedIndex = sortedOld.findIndex((c) => c.id === action.payload)

      let newTurnIndex = state.currentTurnIndex
      if (newCharacters.length === 0) {
        newTurnIndex = 0
      } else if (removedIndex < state.currentTurnIndex) {
        newTurnIndex = Math.max(0, state.currentTurnIndex - 1)
      } else if (state.currentTurnIndex >= newCharacters.length) {
        newTurnIndex = 0
      }

      return {
        ...state,
        characters: newCharacters,
        currentTurnIndex: newTurnIndex,
      }
    }

    case 'NEXT_TURN': {
      if (state.characters.length === 0) return state
      const nextIndex = (state.currentTurnIndex + 1) % state.characters.length
      const newRound = nextIndex === 0 ? state.roundNumber + 1 : state.roundNumber
      return {
        ...state,
        currentTurnIndex: nextIndex,
        roundNumber: newRound,
      }
    }

    case 'PREVIOUS_TURN': {
      if (state.characters.length === 0) return state
      const prevIndex = state.currentTurnIndex === 0
        ? state.characters.length - 1
        : state.currentTurnIndex - 1
      const newRound = state.currentTurnIndex === 0 && state.roundNumber > 1
        ? state.roundNumber - 1
        : state.roundNumber
      return {
        ...state,
        currentTurnIndex: prevIndex,
        roundNumber: newRound,
      }
    }

    case 'SET_NOTES':
      return {
        ...state,
        notes: action.payload,
      }

    case 'RESET_ENCOUNTER':
      return {
        ...state,
        characters: [],
        currentTurnIndex: 0,
        roundNumber: 1,
      }

    case 'SAVE_PRESET':
      return {
        ...state,
        presets: [
          ...state.presets.filter((p) => p.id !== action.payload.id),
          action.payload,
        ],
      }

    case 'DELETE_PRESET':
      return {
        ...state,
        presets: state.presets.filter((p) => p.id !== action.payload),
      }

    case 'LOAD_PRESET': {
      const { preset, mode } = action.payload
      const newCharacters: Character[] = preset.characters.map((pc) => ({
        id: crypto.randomUUID(),
        name: pc.name,
        armorClass: pc.armorClass,
        hp: pc.maxHp,
        maxHp: pc.maxHp,
        initiative: 0,
        isNPC: pc.isNPC,
      }))

      if (mode === 'replace') {
        return {
          ...state,
          characters: newCharacters,
          currentTurnIndex: 0,
          roundNumber: 1,
        }
      } else {
        return {
          ...state,
          characters: [...state.characters, ...newCharacters],
        }
      }
    }

    default:
      return state
  }
}

export function encounterReducer(state: EncounterState, action: EncounterAction): EncounterState {
  const next = reduceEncounter(state, action)
  if (!['ADD_CHARACTER', 'UPDATE_CHARACTER', 'REMOVE_CHARACTER', 'LOAD_PRESET'].includes(action.type) ||
      (action.type === 'LOAD_PRESET' && action.payload.mode === 'replace')) return next
  const activeId = getSortedCharacters(state.characters)[state.currentTurnIndex]?.id
  const index = getSortedCharacters(next.characters).findIndex(character => character.id === activeId)
  return index < 0 ? next : { ...next, currentTurnIndex: index }
}
