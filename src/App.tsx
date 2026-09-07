import { useEffect, useState } from 'react'
import { EncounterProvider, useEncounter } from './context/EncounterContext'
import { InitiativeTracker } from './components/InitiativeTracker'
import { Icon } from './components/Icon'
import { CharacterForm } from './components/CharacterForm'
import { ToolDock, type ToolId } from './components/ToolDock'

function EncounterShell() {
  const { sortedCharacters, state, dispatch } = useEncounter()
  const [activeTool, setActiveTool] = useState<ToolId>('dice')
  const [isSummonOpen, setIsSummonOpen] = useState(false)

  let npcCount = 0
  let bloodiedCount = 0
  for (const character of sortedCharacters) {
    if (character.isNPC) npcCount += 1
    if (
      character.hp !== undefined &&
      character.maxHp !== undefined &&
      character.hp > 0 &&
      character.hp / character.maxHp <= 0.5
    ) {
      bloodiedCount += 1
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || document.querySelector('dialog[open]')) return
      if (target.closest('input, textarea, select, button, [contenteditable="true"]')) return

      if (event.key === 'ArrowRight') dispatch({ type: 'NEXT_TURN' })
      if (event.key === 'ArrowLeft') dispatch({ type: 'PREVIOUS_TURN' })
      if (event.key.toLowerCase() === 'a') setIsSummonOpen(true)
      if (event.key.toLowerCase() === 'd') setActiveTool('dice')
      if (event.key.toLowerCase() === 'n') setActiveTool('notes')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch])

  return (
    <div className="war-table min-h-[100dvh]">
      <div className="relative mx-auto w-full max-w-[1480px] px-4 pb-8 pt-5 md:px-7 md:pb-8 md:pt-7">
        <header className="war-header">
          <div className="brand-lockup">
            <div className="brand-seal" aria-hidden="true"><Icon name="sword" className="h-8 w-8" /></div>
            <h1>Initiative Tracker</h1>
          </div>

          <div className="encounter-marks" aria-label="Encounter overview">
            <dl className="encounter-ledger">
              <div className="round-count"><dt>Round</dt><dd>{state.roundNumber}</dd></div>
              <div><dt>Combatants</dt><dd>{sortedCharacters.length}</dd></div>
              <div><dt>Hostiles</dt><dd>{npcCount}</dd></div>
              <div className={bloodiedCount > 0 ? 'text-combat-damage' : ''}>
                <dt>Bloodied</dt><dd>{bloodiedCount}</dd>
              </div>
            </dl>
          </div>
        </header>

        <main className="war-layout">
          <InitiativeTracker onSummon={() => setIsSummonOpen(true)} />
          <ToolDock activeTool={activeTool} onToolChange={setActiveTool} />
        </main>
      </div>

      <CharacterForm isOpen={isSummonOpen} onClose={() => setIsSummonOpen(false)} />
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
