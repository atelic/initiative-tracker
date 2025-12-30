import { useState, useRef, useEffect } from 'react'
import { useEncounter } from '../context/EncounterContext'
import type { Character } from '../types'
import { CONDITIONS } from '../types'

interface CharacterCardProps {
  character: Character
  isActive: boolean
}

export function CharacterCard({ character, isActive }: CharacterCardProps) {
  const { dispatch } = useEncounter()
  const [isEditing, setIsEditing] = useState(false)
  const [showConditions, setShowConditions] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [editingNotes, setEditingNotes] = useState(false)
  const [showConcentration, setShowConcentration] = useState(false)
  const [hpInput, setHpInput] = useState('')
  const [notesInput, setNotesInput] = useState(character.notes ?? '')
  const [concentrationInput, setConcentrationInput] = useState(character.concentration ?? '')
  const [conSaveAlert, setConSaveAlert] = useState<number | null>(null)
  const [editValues, setEditValues] = useState({
    name: character.name,
    initiative: character.initiative,
    armorClass: character.armorClass ?? '',
    hp: character.hp ?? '',
    maxHp: character.maxHp ?? '',
  })
  const nameInputRef = useRef<HTMLInputElement>(null)
  const hpInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus()
      nameInputRef.current.select()
    }
  }, [isEditing])

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_CHARACTER',
      payload: {
        ...character,
        name: editValues.name || character.name,
        initiative: Number(editValues.initiative) || 0,
        armorClass: editValues.armorClass !== '' ? Number(editValues.armorClass) : undefined,
        hp: editValues.hp !== '' ? Number(editValues.hp) : undefined,
        maxHp: editValues.maxHp !== '' ? Number(editValues.maxHp) : undefined,
      },
    })
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditValues({
        name: character.name,
        initiative: character.initiative,
        armorClass: character.armorClass ?? '',
        hp: character.hp ?? '',
        maxHp: character.maxHp ?? '',
      })
    }
  }

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_CHARACTER', payload: character.id })
  }

  const applyHpChange = (isDamage: boolean) => {
    const amount = parseInt(hpInput) || 0
    if (amount === 0) return

    const currentHp = character.hp ?? 0
    const delta = isDamage ? -amount : amount
    const newHp = Math.max(0, currentHp + delta)

    // Check for concentration save
    if (isDamage && amount > 0 && character.concentration) {
      const dc = Math.max(10, Math.floor(amount / 2))
      setConSaveAlert(dc)
      setTimeout(() => setConSaveAlert(null), 5000)
    }

    // Reset death saves when HP goes above 0
    const deathSaves = newHp > 0 ? undefined : character.deathSaves
    dispatch({
      type: 'UPDATE_CHARACTER',
      payload: { ...character, hp: newHp, deathSaves },
    })
    setHpInput('')
  }

  const handleHpKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      applyHpChange(true) // Default to damage on Enter
    }
  }

  const handleDeathSave = (type: 'successes' | 'failures', delta: number) => {
    const current = character.deathSaves ?? { successes: 0, failures: 0 }
    const newValue = Math.max(0, Math.min(3, current[type] + delta))
    dispatch({
      type: 'UPDATE_CHARACTER',
      payload: {
        ...character,
        deathSaves: { ...current, [type]: newValue },
      },
    })
  }

  const toggleCondition = (condition: string) => {
    const current = character.conditions ?? []
    const newConditions = current.includes(condition)
      ? current.filter(c => c !== condition)
      : [...current, condition]
    dispatch({
      type: 'UPDATE_CHARACTER',
      payload: { ...character, conditions: newConditions.length > 0 ? newConditions : undefined },
    })
  }

  const clearConcentration = () => {
    dispatch({
      type: 'UPDATE_CHARACTER',
      payload: { ...character, concentration: undefined },
    })
  }

  const isDown = character.hp === 0 && !character.isNPC
  const deathSaves = character.deathSaves ?? { successes: 0, failures: 0 }
  const conditions = character.conditions ?? []

  // Calculate HP bar percentage
  const hpPercentage = character.maxHp && character.hp !== undefined
    ? Math.min(100, Math.max(0, (character.hp / character.maxHp) * 100))
    : null

  const getHpColor = () => {
    if (!hpPercentage) return 'bg-parchment-400'
    if (hpPercentage > 50) return 'bg-combat-heal'
    if (hpPercentage > 25) return 'bg-accent-gold'
    return 'bg-combat-damage'
  }

  return (
    <div
      className={`
        rounded-lg p-3 transition-all duration-200
        ${isActive
          ? 'bg-accent-gold/20 border-2 border-accent-gold shadow-card-hover'
          : 'bg-parchment-100/50 border border-parchment-300 hover:bg-parchment-100'}
        ${character.isNPC ? 'border-l-4 border-l-accent-ruby' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Initiative Badge */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-parchment-200 border-2 border-parchment-400 flex items-center justify-center">
          {isEditing ? (
            <input
              type="number"
              value={editValues.initiative}
              onChange={(e) => setEditValues({ ...editValues, initiative: Number(e.target.value) })}
              onKeyDown={handleKeyDown}
              className="w-10 h-10 text-center text-lg font-display bg-transparent border-none focus:outline-none"
            />
          ) : (
            <span className="text-lg font-display font-semibold">{character.initiative}</span>
          )}
        </div>

        {/* Character Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isEditing ? (
              <input
                ref={nameInputRef}
                type="text"
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                onKeyDown={handleKeyDown}
                className="input-inline text-base font-semibold flex-1"
              />
            ) : (
              <h3 className="font-semibold truncate">{character.name}</h3>
            )}
            {isActive && (
              <span className="flex-shrink-0 text-xs font-display uppercase tracking-wider text-accent-gold">
                Active
              </span>
            )}
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-4 text-sm">
            {/* AC */}
            <div className="flex items-center gap-1">
              <span className="stat-label">AC</span>
              {isEditing ? (
                <input
                  type="number"
                  value={editValues.armorClass}
                  onChange={(e) => setEditValues({ ...editValues, armorClass: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="—"
                  className="input-inline w-12"
                />
              ) : (
                <span className="font-semibold">{character.armorClass ?? '—'}</span>
              )}
            </div>

            {/* HP */}
            <div className="flex items-center gap-1">
              <span className="stat-label">HP</span>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={editValues.hp}
                    onChange={(e) => setEditValues({ ...editValues, hp: e.target.value })}
                    onKeyDown={handleKeyDown}
                    placeholder="—"
                    className="input-inline w-12"
                  />
                  <span className="text-ink-muted">/</span>
                  <input
                    type="number"
                    value={editValues.maxHp}
                    onChange={(e) => setEditValues({ ...editValues, maxHp: e.target.value })}
                    onKeyDown={handleKeyDown}
                    placeholder="max"
                    className="input-inline w-12"
                  />
                </div>
              ) : (
                <span className="font-semibold">
                  {character.hp !== undefined ? character.hp : '—'}
                  {character.maxHp !== undefined && `/${character.maxHp}`}
                </span>
              )}
            </div>
          </div>

          {/* HP Bar */}
          {!isEditing && hpPercentage !== null && (
            <div className="mt-2 h-1.5 bg-parchment-300 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getHpColor()}`}
                style={{ width: `${hpPercentage}%` }}
              />
            </div>
          )}

          {/* Concentration Badge */}
          {!isEditing && character.concentration && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 text-blue-800 rounded text-xs font-medium">
              <span className="opacity-70">⟡</span>
              {character.concentration}
              <button
                onClick={clearConcentration}
                className="ml-1 hover:text-combat-damage"
                aria-label="Drop concentration"
              >
                ×
              </button>
            </div>
          )}

          {/* Concentration Save Alert */}
          {conSaveAlert !== null && (
            <div className="mt-2 p-2 bg-accent-gold/20 border border-accent-gold rounded text-sm animate-pulse">
              <strong>Concentration Check!</strong> DC {conSaveAlert} Constitution save
            </div>
          )}

          {/* Condition Badges */}
          {!isEditing && conditions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {conditions.map(condition => (
                <span
                  key={condition}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-combat-damage/20 text-combat-damage rounded text-xs font-medium"
                >
                  {condition}
                  <button
                    onClick={() => toggleCondition(condition)}
                    className="hover:text-ink"
                    aria-label={`Remove ${condition}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Death Saves */}
          {!isEditing && isDown && (
            <div className="mt-3 p-2 bg-ink/5 rounded-lg border border-combat-damage/30">
              <div className="text-xs font-display uppercase tracking-wider text-combat-damage mb-2">
                Death Saves
              </div>
              <div className="flex items-center gap-4">
                {/* Successes */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-ink-muted mr-1">Pass</span>
                  {[0, 1, 2].map((i) => (
                    <button
                      key={`success-${i}`}
                      onClick={() => handleDeathSave('successes', i < deathSaves.successes ? -1 : 1)}
                      className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        i < deathSaves.successes
                          ? 'bg-combat-heal border-combat-heal'
                          : 'bg-transparent border-parchment-400 hover:border-combat-heal'
                      }`}
                      aria-label={`Death save success ${i + 1}`}
                    />
                  ))}
                </div>
                {/* Failures */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-ink-muted mr-1">Fail</span>
                  {[0, 1, 2].map((i) => (
                    <button
                      key={`failure-${i}`}
                      onClick={() => handleDeathSave('failures', i < deathSaves.failures ? -1 : 1)}
                      className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        i < deathSaves.failures
                          ? 'bg-combat-damage border-combat-damage'
                          : 'bg-transparent border-parchment-400 hover:border-combat-damage'
                      }`}
                      aria-label={`Death save failure ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              {deathSaves.successes >= 3 && (
                <div className="mt-2 text-xs text-combat-heal font-semibold">Stabilized!</div>
              )}
              {deathSaves.failures >= 3 && (
                <div className="mt-2 text-xs text-combat-damage font-semibold">Dead</div>
              )}
            </div>
          )}

          {/* Notes (expandable) */}
          {!isEditing && character.notes && !showNotes && (
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setShowNotes(true)}
                className="text-xs text-ink-muted hover:text-ink flex items-center gap-1"
              >
                <span>📝</span> View notes
              </button>
              <button
                onClick={() => dispatch({
                  type: 'UPDATE_CHARACTER',
                  payload: { ...character, notes: undefined },
                })}
                className="text-xs text-ink-muted hover:text-combat-damage"
                aria-label="Clear notes"
              >
                ×
              </button>
            </div>
          )}
          {!isEditing && showNotes && (
            <div className="mt-2 p-2 bg-parchment-200/50 rounded text-sm">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-display uppercase tracking-wider text-ink-muted">Notes</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch({
                      type: 'UPDATE_CHARACTER',
                      payload: { ...character, notes: undefined },
                    })}
                    className="text-xs text-ink-muted hover:text-combat-damage"
                  >
                    Clear
                  </button>
                  <button onClick={() => setShowNotes(false)} className="text-xs text-ink-muted hover:text-ink">
                    Hide
                  </button>
                </div>
              </div>
              <p className="whitespace-pre-wrap text-ink-light">{character.notes}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          {isEditing ? (
            <div className="flex items-center gap-1">
              <button
                onClick={handleSave}
                className="btn-primary btn-sm"
                aria-label="Save changes"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-ghost btn-sm"
                aria-label="Cancel editing"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              {/* HP Damage/Heal Controls */}
              {character.hp !== undefined && (
                <div className="flex items-center gap-1">
                  <input
                    ref={hpInputRef}
                    type="number"
                    value={hpInput}
                    onChange={(e) => setHpInput(e.target.value)}
                    onKeyDown={handleHpKeyDown}
                    placeholder="HP"
                    className="w-14 px-2 py-1 text-center text-sm rounded border border-parchment-400 bg-parchment-50"
                  />
                  <button
                    onClick={() => applyHpChange(true)}
                    disabled={!hpInput}
                    className="px-2 py-1 text-xs font-display uppercase bg-combat-damage/20 text-combat-damage rounded hover:bg-combat-damage hover:text-white disabled:opacity-50 transition-colors"
                    aria-label="Apply damage"
                  >
                    Dmg
                  </button>
                  <button
                    onClick={() => applyHpChange(false)}
                    disabled={!hpInput}
                    className="px-2 py-1 text-xs font-display uppercase bg-combat-heal/20 text-combat-heal rounded hover:bg-combat-heal hover:text-white disabled:opacity-50 transition-colors"
                    aria-label="Apply healing"
                  >
                    Heal
                  </button>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowConditions(!showConditions)}
                  className={`btn-ghost btn-sm ${conditions.length > 0 ? 'text-combat-damage' : ''}`}
                  aria-label="Toggle conditions"
                  title="Conditions"
                >
                  ⚡
                </button>
                <button
                  onClick={() => {
                    setShowConcentration(!showConcentration)
                    setConcentrationInput(character.concentration ?? '')
                  }}
                  className={`btn-ghost btn-sm ${character.concentration ? 'text-blue-600' : ''}`}
                  aria-label="Set concentration"
                  title="Concentration"
                >
                  ⟡
                </button>
                <button
                  onClick={() => {
                    setEditingNotes(!editingNotes)
                    setNotesInput(character.notes ?? '')
                  }}
                  className={`btn-ghost btn-sm ${character.notes ? 'text-ink' : ''}`}
                  aria-label="Edit notes"
                  title="Notes"
                >
                  📝
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-ghost btn-sm"
                  aria-label="Edit character"
                  title="Edit"
                >
                  ✎
                </button>
                <button
                  onClick={handleRemove}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold text-combat-damage hover:bg-combat-damage hover:text-white transition-colors"
                  aria-label="Remove character"
                >
                  ×
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Condition Picker */}
      {showConditions && !isEditing && (
        <div className="mt-3 p-3 bg-parchment-200/50 rounded-lg border border-parchment-300">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-display uppercase tracking-wider text-ink-muted">Conditions</span>
            <button onClick={() => setShowConditions(false)} className="text-xs text-ink-muted hover:text-ink">
              Close
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {CONDITIONS.map(condition => (
              <button
                key={condition}
                onClick={() => toggleCondition(condition)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  conditions.includes(condition)
                    ? 'bg-combat-damage text-white'
                    : 'bg-parchment-100 hover:bg-parchment-300'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Concentration Input */}
      {showConcentration && !isEditing && (
        <div className="mt-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-display uppercase tracking-wider text-blue-800">Concentration</span>
            <button onClick={() => setShowConcentration(false)} className="text-xs text-ink-muted hover:text-ink">
              Close
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={concentrationInput}
              onChange={(e) => setConcentrationInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  dispatch({
                    type: 'UPDATE_CHARACTER',
                    payload: { ...character, concentration: concentrationInput || undefined },
                  })
                  setShowConcentration(false)
                } else if (e.key === 'Escape') {
                  setShowConcentration(false)
                }
              }}
              placeholder="Spell name..."
              className="flex-1 px-2 py-1 text-sm rounded border border-parchment-400 bg-parchment-50"
              autoFocus
            />
            <button
              onClick={() => {
                dispatch({
                  type: 'UPDATE_CHARACTER',
                  payload: { ...character, concentration: concentrationInput || undefined },
                })
                setShowConcentration(false)
              }}
              className="btn-primary btn-sm"
            >
              Save
            </button>
            {character.concentration && (
              <button
                onClick={() => {
                  dispatch({
                    type: 'UPDATE_CHARACTER',
                    payload: { ...character, concentration: undefined },
                  })
                  setShowConcentration(false)
                }}
                className="btn-ghost btn-sm text-combat-damage"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Notes Input */}
      {editingNotes && !isEditing && (
        <div className="mt-3 p-3 bg-parchment-200/50 rounded-lg border border-parchment-300">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-display uppercase tracking-wider text-ink-muted">Notes</span>
            <button onClick={() => setEditingNotes(false)} className="text-xs text-ink-muted hover:text-ink">
              Close
            </button>
          </div>
          <textarea
            value={notesInput}
            onChange={(e) => setNotesInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setEditingNotes(false)
              }
            }}
            placeholder="Resistances, abilities, reminders..."
            rows={3}
            className="w-full px-2 py-1 text-sm rounded border border-parchment-400 bg-parchment-50 resize-none"
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-2">
            {character.notes && (
              <button
                onClick={() => {
                  dispatch({
                    type: 'UPDATE_CHARACTER',
                    payload: { ...character, notes: undefined },
                  })
                  setEditingNotes(false)
                }}
                className="btn-ghost btn-sm text-combat-damage"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => {
                dispatch({
                  type: 'UPDATE_CHARACTER',
                  payload: { ...character, notes: notesInput || undefined },
                })
                setEditingNotes(false)
              }}
              className="btn-primary btn-sm"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
