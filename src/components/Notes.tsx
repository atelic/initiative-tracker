import { useEncounter } from '../context/EncounterContext'
import { Icon } from './Icon'

export function Notes() {
  const { state, dispatch } = useEncounter()
  return (
    <section className="card">
      <div className="mb-5 flex items-start justify-between gap-3 border-b border-brass-400/20 pb-4">
        <div>
          <h2>Session Notes</h2>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded border border-white/[0.1] text-combat-heal">
          <Icon name="book" className="h-4 w-4" />
        </div>
      </div>

      <textarea
        value={state.notes}
        onChange={(event) => dispatch({ type: 'SET_NOTES', payload: event.target.value })}
        placeholder="Enemy weaknesses, loot, bargains, grudges, names worth remembering..."
        className="input min-h-[260px] resize-y font-mono text-xs leading-6"
        aria-label="Session notes"
      />

      <p className="mt-1.5 font-mono text-[11px] text-ink-muted">
        Notes are automatically saved
      </p>
    </section>
  )
}
