import { EncounterProvider } from './context/EncounterContext'
import { InitiativeTracker } from './components/InitiativeTracker'
import { CharacterForm } from './components/CharacterForm'
import { DiceRoller } from './components/DiceRoller'
import { Notes } from './components/Notes'
import { PresetManager } from './components/PresetManager'
import { Icon } from './components/Icon'
import { useEncounter } from './context/EncounterContext'

function EncounterShell() {
  const { sortedCharacters, activeCharacter, state } = useEncounter()
  const npcCount = sortedCharacters.filter((character) => character.isNPC).length
  const bloodiedCount = sortedCharacters.filter((character) => {
    if (character.hp === undefined || character.maxHp === undefined) return false
    return character.hp > 0 && character.hp / character.maxHp <= 0.5
  }).length

  return (
    <div className="relative min-h-[100dvh] overflow-hidden px-3 py-3 md:px-5 md:py-4">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full border border-accent-gold/25" />
      <div className="pointer-events-none absolute right-[-8rem] top-[-6rem] h-96 w-96 rounded-full border border-combat-heal/20 slow-drift" />

      <header className="relative mx-auto grid max-w-7xl gap-3 pb-3 md:grid-cols-[1fr_1.15fr] md:items-end">
        <div>
          <div className="section-kicker mb-2">Round control / live encounter board</div>
          <h1>Initiative Tracker</h1>
          <p className="mt-2 max-w-[52ch] text-xs leading-5 text-ink-muted md:text-sm">
            A sharp combat desk for turn order, hit points, conditions, notes, dice, and reusable enemy rosters.
          </p>
        </div>

        <div className="glass-panel relative overflow-hidden rounded-card p-3">
          <div className="scanline absolute left-0 top-0 h-px w-full" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <p className="section-kicker">Round</p>
              <p className="mt-1 font-mono text-2xl font-semibold">{state.roundNumber}</p>
            </div>
            <div>
              <p className="section-kicker">Actors</p>
              <p className="mt-1 font-mono text-2xl font-semibold">{sortedCharacters.length}</p>
            </div>
            <div>
              <p className="section-kicker">NPCs</p>
              <p className="mt-1 font-mono text-2xl font-semibold">{npcCount}</p>
            </div>
            <div className="min-w-0 border-l border-ink/10 pl-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-parchment-50">
                  <Icon name="spark" className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="section-kicker">On deck</p>
                  <p className="truncate text-sm font-semibold">
                    {activeCharacter ? activeCharacter.name : 'No active combatant'}
                  </p>
                </div>
              </div>
              {bloodiedCount > 0 && (
                <span className="mt-1 inline-flex rounded-full bg-combat-damage/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-combat-damage">
                  {bloodiedCount} bloodied
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.38fr)_minmax(330px,0.62fr)]">
        <div className="space-y-3">
          <InitiativeTracker />
          <CharacterForm />
        </div>

        <aside className="space-y-3">
          <DiceRoller />
          <Notes />
          <PresetManager />
        </aside>
      </main>
    </div>
  )
}

function App() {
  return (
    <EncounterProvider>
      <EncounterShell />
    </EncounterProvider>
  )
}

export default App
