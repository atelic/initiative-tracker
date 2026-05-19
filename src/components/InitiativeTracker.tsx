import { useEncounter } from '../context/EncounterContext'
import { CharacterCard } from './CharacterCard'
import { Icon } from './Icon'

export function InitiativeTracker() {
  const { state, dispatch, sortedCharacters, activeCharacter } = useEncounter()

  const handleNextTurn = () => dispatch({ type: 'NEXT_TURN' })
  const handlePrevTurn = () => dispatch({ type: 'PREVIOUS_TURN' })
  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all characters?')) {
      dispatch({ type: 'RESET_ENCOUNTER' })
    }
  }

  return (
    <section className="card relative overflow-hidden">
      <div className="absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r from-combat-damage via-accent-gold to-combat-heal" />
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="section-kicker mb-1">Turn stack</p>
          <h2>Initiative Order</h2>
        </div>
        {sortedCharacters.length > 0 && (
          <span className="rounded-full border border-ink/10 bg-white/45 px-2.5 py-1 font-mono text-xs font-semibold text-ink-muted">
            Round {state.roundNumber}
          </span>
        )}
      </div>

      {sortedCharacters.length === 0 ? (
        <div className="grid gap-3 rounded-card border border-dashed border-ink/20 bg-white/30 p-4 text-ink-muted md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-parchment-50">
            <Icon name="cross" className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-ink">No combatants loaded</p>
            <p className="mt-1 text-sm">Add players, monsters, and summoned creatures below to build the order.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-3 space-y-2">
            {sortedCharacters.map((character, index) => (
              <CharacterCard
                key={character.id}
                character={character}
                isActive={activeCharacter?.id === character.id}
                position={index + 1}
              />
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-ink/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <button
                onClick={handlePrevTurn}
                className="btn-secondary btn-sm"
                aria-label="Previous turn"
              >
                <Icon name="chevronLeft" className="h-4 w-4" />
                Prev
              </button>
              <button
                onClick={handleNextTurn}
                className="btn-primary"
                aria-label="Next turn"
              >
                Next Turn
                <Icon name="chevronRight" className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleReset}
              className="btn-ghost btn-sm text-combat-damage sm:ml-auto"
              aria-label="Clear encounter"
            >
              <Icon name="trash" className="h-4 w-4" />
              Clear All
            </button>
          </div>
        </>
      )}
    </section>
  )
}
