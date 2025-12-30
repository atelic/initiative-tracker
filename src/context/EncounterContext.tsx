import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { EncounterState, EncounterAction, Character } from '../types'

const STORAGE_KEY = 'initiative-tracker-v2'

const initialState: EncounterState = {
  characters: [],
  notes: '',
  currentTurnIndex: 0,
  roundNumber: 1,
  presets: [],
}

function getSortedCharacters(characters: Character[]): Character[] {
  return [...characters].sort((a, b) => {
    const initA = Number(a.initiative) || 0
    const initB = Number(b.initiative) || 0
    if (initA === initB) return 0
    return initA > initB ? -1 : 1
  })
}

function encounterReducer(state: EncounterState, action: EncounterAction): EncounterState {
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

    case 'HYDRATE':
      return action.payload

    default:
      return state
  }
}

interface EncounterContextValue {
  state: EncounterState
  dispatch: React.Dispatch<EncounterAction>
  sortedCharacters: Character[]
  activeCharacter: Character | null
}

const EncounterContext = createContext<EncounterContextValue | null>(null)

function loadFromStorage(): EncounterState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    console.error('Failed to load from localStorage')
  }
  return null
}

function saveToStorage(state: EncounterState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    console.error('Failed to save to localStorage')
  }
}

export function EncounterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    encounterReducer,
    initialState,
    (initial) => loadFromStorage() || initial
  )

  // Persist to localStorage on state changes
  useEffect(() => {
    saveToStorage(state)
  }, [state])

  // Computed values
  const sortedCharacters = getSortedCharacters(state.characters)
  const activeCharacter = sortedCharacters[state.currentTurnIndex] || null

  return (
    <EncounterContext.Provider value={{ state, dispatch, sortedCharacters, activeCharacter }}>
      {children}
    </EncounterContext.Provider>
  )
}

export function useEncounter(): EncounterContextValue {
  const context = useContext(EncounterContext)
  if (!context) {
    throw new Error('useEncounter must be used within EncounterProvider')
  }
  return context
}
