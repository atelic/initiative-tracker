import { EncounterProvider } from './context/EncounterContext'
import { InitiativeTracker } from './components/InitiativeTracker'
import { CharacterForm } from './components/CharacterForm'
import { DiceRoller } from './components/DiceRoller'
import { Notes } from './components/Notes'
import { PresetManager } from './components/PresetManager'

function App() {
  return (
    <EncounterProvider>
      <div className="min-h-screen p-4 md:p-8">
        <header className="max-w-6xl mx-auto mb-8">
          <h1 className="text-center text-shadow-sm">Initiative Tracker</h1>
          <p className="text-center text-ink-muted font-body mt-2">
            Track combat initiative, health, and notes for your tabletop adventures
          </p>
        </header>

        <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Initiative Tracker */}
          <div className="space-y-6">
            <InitiativeTracker />
            <CharacterForm />
          </div>

          {/* Right Column - Tools */}
          <div className="space-y-6">
            <DiceRoller />
            <Notes />
            <PresetManager />
          </div>
        </main>

        <footer className="max-w-6xl mx-auto mt-12 text-center text-ink-muted text-sm">
          <p>Roll for initiative!</p>
        </footer>
      </div>
    </EncounterProvider>
  )
}

export default App
