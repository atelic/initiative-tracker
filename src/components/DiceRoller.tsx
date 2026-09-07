import { useState } from 'react'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { Icon } from './Icon'

const quickRolls = [
  { label: 'd20', notation: '1d20' },
  { label: 'Adv', notation: '2d20kh1' },
  { label: 'Dis', notation: '2d20kl1' },
  { label: 'd12', notation: '1d12' },
  { label: 'd10', notation: '1d10' },
  { label: 'd8', notation: '1d8' },
  { label: 'd6', notation: '1d6' },
  { label: 'd4', notation: '1d4' },
]

export function DiceRoller() {
  const [notation, setNotation] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRoll = (diceNotation: string = notation) => {
    if (!diceNotation.trim()) {
      setResult(null)
      setError(null)
      return
    }

    try {
      setResult(new DiceRoll(diceNotation).output)
      setError(null)
    } catch {
      setError('Invalid dice notation')
      setResult(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleRoll()
  }

  const handleQuickRoll = (diceNotation: string) => {
    setNotation(diceNotation)
    handleRoll(diceNotation)
  }

  return (
    <section className="card">
      <div className="mb-5 flex items-start justify-between gap-3 border-b border-brass-400/20 pb-4">
        <div>
          <h2>Dice Roller</h2>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded border border-white/[0.1] text-brass-200">
          <Icon name="dice" className="h-4 w-4" />
        </div>
      </div>

      <div className="mb-3 grid grid-cols-4 gap-1.5">
        {quickRolls.map(({ label, notation: n }) => (
          <button
            key={label}
            onClick={() => handleQuickRoll(n)}
            className="btn-secondary btn-sm font-mono"
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mb-3 flex gap-2">
        <input
          type="text"
          value={notation}
          onChange={(e) => setNotation(e.target.value)}
          placeholder="2d6+3, 4d6kh3"
          className="input flex-1 font-mono text-sm"
          aria-label="Dice notation"
        />
        <button
          type="submit"
          disabled={!notation.trim()}
          className="btn-primary"
        >
          Roll
        </button>
      </form>

      {(result || error) && (
        <div role="status" className={`
          p-3
          ${error ? 'bg-combat-damage/10 border border-combat-damage/30' : 'bg-white/[0.025] border border-brass-400/20'}
        `}>
          {error ? (
            <p className="text-combat-damage text-sm">{error}</p>
          ) : (
            <div className="dice-result whitespace-pre-wrap break-all">{result}</div>
          )}
        </div>
      )}

      <p className="mt-3 text-[11px] leading-5 text-ink-muted">
        Supports standard notation: <code className="bg-parchment-200 px-1 rounded">2d6</code>,{' '}
        <code className="bg-parchment-200 px-1 rounded">1d20+5</code>,{' '}
        <code className="bg-parchment-200 px-1 rounded">4d6kh3</code> (keep highest 3)
      </p>
    </section>
  )
}
