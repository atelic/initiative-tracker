import { useEncounter } from '../context/EncounterContext'
import { CharacterCard, CharacterRow } from './CharacterCard'
import { Icon } from './Icon'

interface InitiativeTrackerProps {
  onSummon: () => void
}

export function InitiativeTracker({ onSummon }: InitiativeTrackerProps) {
  const { state, dispatch, sortedCharacters, activeCharacter } = useEncounter()

  const handleReset = () => {
    if (window.confirm('Clear every combatant from this encounter?')) {
      dispatch({ type: 'RESET_ENCOUNTER' })
    }
  }

  if (sortedCharacters.length === 0) {
    return (
      <section className="encounter-stage empty-encounter">
        <div className="empty-rune" aria-hidden="true">
          <Icon name="sword" className="h-8 w-8" />
        </div>
        <div>
          <h2 className="mt-3 text-3xl md:text-4xl">The field awaits</h2>
          <p className="mt-3 max-w-[48ch] text-sm leading-6 text-vellum-300">
            Add a player, ally, or hostile creature to establish the turn order.
          </p>
          <button type="button" onClick={onSummon} className="btn-primary mt-6">
            <Icon name="plus" className="h-4 w-4" />
            Add first combatant
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="encounter-stage">
      <div className="turn-rail">
        <div className="rail-heading">
          <div>
            <h2>Turn order</h2>
          </div>
          <button type="button" onClick={onSummon} className="icon-button" aria-label="Add combatant">
            <Icon name="plus" className="h-4 w-4" />
          </button>
        </div>

        <ol className="rail-list">
          {sortedCharacters.map((character, index) => (
            <CharacterRow
              key={character.id}
              character={character}
              isActive={activeCharacter?.id === character.id}
              position={index + 1}
            />
          ))}
        </ol>

        <button type="button" onClick={handleReset} className="rail-clear">
          <Icon name="trash" className="h-3.5 w-3.5" />
          Clear encounter
        </button>
      </div>

      <div className="active-stage">
        <div className="stage-heading">
          <div>
            <p className="mt-1 text-xs text-vellum-400">Round {state.roundNumber} · Position {state.currentTurnIndex + 1} of {sortedCharacters.length}</p>
          </div>
        </div>

        {activeCharacter && <CharacterCard key={activeCharacter.id} character={activeCharacter} />}

        <div className="turn-controls">
          <button type="button" onClick={() => dispatch({ type: 'PREVIOUS_TURN' })} className="btn-secondary">
            <Icon name="chevronLeft" className="h-4 w-4" />
            Previous
          </button>
          <button type="button" onClick={() => dispatch({ type: 'NEXT_TURN' })} className="btn-primary next-turn">
            Next turn
            <Icon name="chevronRight" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
