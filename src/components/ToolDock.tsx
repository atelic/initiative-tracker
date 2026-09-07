import { lazy, Suspense, useState } from 'react'
import { Icon } from './Icon'
import { Notes } from './Notes'
import { PresetManager } from './PresetManager'

const DiceRoller = lazy(() => import('./DiceRoller').then(module => ({ default: module.DiceRoller })))
export type ToolId = 'dice' | 'notes' | 'presets'

const tools = [
  { id: 'dice', label: 'Dice', icon: 'dice' },
  { id: 'notes', label: 'Notes', icon: 'note' },
  { id: 'presets', label: 'Presets', icon: 'book' },
] as const

export function ToolDock({ activeTool, onToolChange }: {
  activeTool: ToolId
  onToolChange: (tool: ToolId) => void
}) {
  const [diceVisited, setDiceVisited] = useState(activeTool === 'dice')
  return (
    <aside className="tool-dock" aria-label="Encounter tools">
      <div className="tool-tabs" role="tablist" aria-label="Encounter tools">
        {tools.map((tool, index) => (
          <button
            key={tool.id}
            id={`tool-tab-${tool.id}`}
            type="button"
            role="tab"
            tabIndex={activeTool === tool.id ? 0 : -1}
            aria-selected={activeTool === tool.id}
            aria-controls={`tool-panel-${tool.id}`}
            onClick={() => { onToolChange(tool.id); if (tool.id === 'dice') setDiceVisited(true) }}
            onKeyDown={event => {
              const next = event.key === 'ArrowRight' ? (index + 1) % tools.length
                : event.key === 'ArrowLeft' ? (index + tools.length - 1) % tools.length
                : event.key === 'Home' ? 0 : event.key === 'End' ? tools.length - 1 : -1
              if (next < 0) return
              event.preventDefault()
              const button = event.currentTarget.parentElement?.children[next] as HTMLButtonElement
              button.focus()
              button.click()
            }}
            className={`tool-tab ${activeTool === tool.id ? 'is-active' : ''}`}
          >
            <Icon name={tool.icon} className="h-4 w-4" />
            <span>{tool.label}</span>
          </button>
        ))}
      </div>
      <div className="tool-workspace">
        {tools.map(tool => (
          <div key={tool.id} id={`tool-panel-${tool.id}`} role="tabpanel" aria-labelledby={`tool-tab-${tool.id}`} hidden={activeTool !== tool.id}>
            {tool.id === 'dice' && (diceVisited || activeTool === 'dice') && <Suspense fallback={<p role="status">Opening the dice pouch…</p>}><DiceRoller /></Suspense>}
            {tool.id === 'notes' && <Notes />}
            {tool.id === 'presets' && <PresetManager />}
          </div>
        ))}
      </div>
    </aside>
  )
}
