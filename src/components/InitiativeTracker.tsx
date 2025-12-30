import { useEncounter } from '../context/EncounterContext'
import { CharacterCard } from './CharacterCard'

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
    <section className="card">
      <div className="flex items-center justify-between mb-4">
        <h2>Initiative Order</h2>
        {sortedCharacters.length > 0 && (
          <span className="text-sm text-ink-muted font-display">
            Round {state.roundNumber}
          </span>
        )}
      </div>

      {sortedCharacters.length === 0 ? (
        <div className="text-center py-8 text-ink-muted">
          <p className="mb-2">No characters in the encounter</p>
          <p className="text-sm">Add characters below to begin tracking initiative</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {sortedCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                isActive={activeCharacter?.id === character.id}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-parchment-300">
            <div className="flex gap-2">
              <button
                onClick={handlePrevTurn}
                className="btn-secondary btn-sm"
                aria-label="Previous turn"
              >
                ← Prev
              </button>
              <button
                onClick={handleNextTurn}
                className="btn-primary"
                aria-label="Next turn"
              >
                Next Turn →
              </button>
            </div>
            <button
              onClick={handleReset}
              className="btn-ghost btn-sm text-combat-damage"
              aria-label="Clear encounter"
            >
              Clear All
            </button>
          </div>
        </>
      )}
    </section>
  )
}
