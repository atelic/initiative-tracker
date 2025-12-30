import { useState, useEffect, useRef } from 'react'
import { useEncounter } from '../context/EncounterContext'

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
      <h2 className="mb-4">Session Notes</h2>

      <textarea
        value={localNotes}
        onChange={handleChange}
        placeholder="Keep track of important details, enemy weaknesses, loot, or anything else..."
        className="input min-h-[200px] resize-y font-mono text-sm"
        aria-label="Session notes"
      />

      <p className="mt-2 text-xs text-ink-muted">
        Notes are automatically saved
      </p>
    </section>
  )
}
