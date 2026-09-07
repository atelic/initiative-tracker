import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { EncounterState, EncounterAction, Character } from '../types'

import { encounterReducer, getSortedCharacters, initialState } from './encounter'

const STORAGE_KEY = 'initiative-tracker-v2'

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

  useEffect(() => {
    saveToStorage(state)
  }, [state])

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
