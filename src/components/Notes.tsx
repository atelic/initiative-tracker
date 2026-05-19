import { useState, useEffect, useRef } from 'react'
import { useEncounter } from '../context/EncounterContext'
import { Icon } from './Icon'

export function Notes() {
  const { state, dispatch } = useEncounter()
  const [localNotes, setLocalNotes] = useState(state.notes)
  const debounceRef = useRef<number | null>(null)

  // Sync local state when external state changes
  useEffect(() => {
    setLocalNotes(state.notes)
  }, [state.notes])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setLocalNotes(value)

    // Debounce the dispatch to avoid excessive saves
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current)
    }
    debounceRef.current = window.setTimeout(() => {
      dispatch({ type: 'SET_NOTES', payload: value })
    }, 500)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current)
      }
    }
  }, [])

  return (
    <section className="card">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="section-kicker mb-1">Table memory</p>
          <h2>Session Notes</h2>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-combat-heal/10 text-combat-heal">
          <Icon name="book" className="h-4 w-4" />
        </div>
      </div>

      <textarea
        value={localNotes}
        onChange={handleChange}
        placeholder="Enemy weaknesses, loot, bargains, grudges, names worth remembering..."
        className="input min-h-[150px] resize-y font-mono text-xs leading-5"
        aria-label="Session notes"
      />

      <p className="mt-1.5 font-mono text-[11px] text-ink-muted">
        Notes are automatically saved
      </p>
    </section>
  )
}
