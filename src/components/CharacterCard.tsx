import { useState, useRef, useEffect } from 'react'
import { useEncounter } from '../context/EncounterContext'
import type { Character } from '../types'
import { CONDITIONS } from '../types'
import { Icon } from './Icon'

interface CharacterCardProps {
  character: Character
  isActive: boolean
  position: number
}

export function CharacterCard({ character, isActive, position }: CharacterCardProps) {
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

  const typeLabel = character.isNPC ? 'NPC' : 'PC'

  return (
    <div
      className={`
        group relative overflow-hidden rounded-card p-2.5 transition-all duration-300
        ${isActive
          ? 'border border-accent-gold/70 bg-accent-gold/15 shadow-card-hover'
          : 'border border-ink/10 bg-white/40 hover:bg-white/55 hover:shadow-card'}
      `}
    >
      <div className={`absolute inset-y-0 left-0 w-1 ${character.isNPC ? 'bg-combat-damage' : 'bg-combat-heal'}`} />
      {isActive && <div className="scanline absolute left-0 top-0 h-px w-full" />}

      <div className="flex flex-col gap-2 pl-1 md:flex-row md:items-start md:gap-3">
        <div className="flex flex-shrink-0 items-center gap-2 md:w-16 md:flex-col md:gap-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">#{position}</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-parchment-50/80 shadow-inner-light">
          {isEditing ? (
            <input
              type="number"
              value={editValues.initiative}
              onChange={(e) => setEditValues({ ...editValues, initiative: Number(e.target.value) })}
              onKeyDown={handleKeyDown}
              className="h-8 w-8 border-none bg-transparent text-center font-mono text-base font-semibold focus:outline-none"
            />
          ) : (
            <span className="font-mono text-base font-semibold">{character.initiative}</span>
          )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            {isEditing ? (
              <input
                ref={nameInputRef}
                type="text"
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                onKeyDown={handleKeyDown}
                className="input-inline min-w-40 flex-1 text-left text-sm font-semibold"
              />
            ) : (
              <h3 className="min-w-0 flex-1 truncate">{character.name}</h3>
            )}
            <span className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] ${
              character.isNPC ? 'bg-combat-damage/10 text-combat-damage' : 'bg-combat-heal/10 text-combat-heal'
            }`}>
              {typeLabel}
            </span>
            {isActive && (
              <span className="flex-shrink-0 rounded-full bg-ink px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-parchment-50">
                Active
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="stat-label">AC</span>
              {isEditing ? (
                <input
                  type="number"
                  value={editValues.armorClass}
                  onChange={(e) => setEditValues({ ...editValues, armorClass: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="-"
                  className="input-inline w-12"
                />
              ) : (
                <span className="font-mono font-semibold">{character.armorClass ?? '-'}</span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="stat-label">HP</span>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={editValues.hp}
                    onChange={(e) => setEditValues({ ...editValues, hp: e.target.value })}
                    onKeyDown={handleKeyDown}
                    placeholder="-"
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
                <span className="font-mono font-semibold">
                  {character.hp !== undefined ? character.hp : '-'}
                  {character.maxHp !== undefined && `/${character.maxHp}`}
                </span>
              )}
            </div>
          </div>

          {/* HP Bar */}
          {!isEditing && hpPercentage !== null && (
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/10">
              <div
                className={`h-full transition-all duration-300 ${getHpColor()}`}
                style={{ width: `${hpPercentage}%` }}
              />
            </div>
          )}

          {/* Concentration Badge */}
          {!isEditing && character.concentration && (
            <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-combat-heal/10 px-2 py-0.5 text-[11px] font-medium text-combat-heal">
              <Icon name="spark" className="h-3 w-3" />
              {character.concentration}
              <button
                onClick={clearConcentration}
                className="ml-1 hover:text-combat-damage"
                aria-label="Drop concentration"
              >
                <Icon name="x" className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* Concentration Save Alert */}
          {conSaveAlert !== null && (
            <div className="mt-1.5 rounded-md border border-accent-gold/45 bg-accent-gold/15 p-1.5 text-xs animate-pulse">
              <strong>Concentration Check!</strong> DC {conSaveAlert} Constitution save
            </div>
          )}

          {/* Condition Badges */}
          {!isEditing && conditions.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {conditions.map(condition => (
                <span
                  key={condition}
                  className="inline-flex items-center gap-1 rounded-full bg-combat-damage/10 px-1.5 py-0.5 text-[11px] font-medium text-combat-damage"
                >
                  {condition}
                  <button
                    onClick={() => toggleCondition(condition)}
                    className="hover:text-ink"
                    aria-label={`Remove ${condition}`}
                  >
                    <Icon name="x" className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Death Saves */}
          {!isEditing && isDown && (
            <div className="mt-2 rounded-md border border-combat-damage/25 bg-combat-damage/10 p-2">
              <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-combat-damage">
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
                    className={`h-4 w-4 rounded-full border transition-colors ${
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
                    className={`h-4 w-4 rounded-full border transition-colors ${
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
            <div className="mt-1.5 flex items-center gap-2">
              <button
                onClick={() => setShowNotes(true)}
                className="flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
              >
                <Icon name="note" className="h-3.5 w-3.5" />
                View notes
              </button>
              <button
                onClick={() => dispatch({
                  type: 'UPDATE_CHARACTER',
                  payload: { ...character, notes: undefined },
                })}
                className="text-xs text-ink-muted hover:text-combat-damage"
                aria-label="Clear notes"
              >
                <Icon name="x" className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          {!isEditing && showNotes && (
            <div className="mt-1.5 rounded-md border border-ink/10 bg-parchment-50/55 p-2 text-xs">
              <div className="flex justify-between items-start mb-1">
                <span className="section-kicker">Notes</span>
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
        <div className="flex-shrink-0 md:flex md:flex-col md:items-end md:gap-1.5">
          {isEditing ? (
            <div className="flex items-center gap-1">
              <button
                onClick={handleSave}
                className="btn-primary btn-sm"
                aria-label="Save changes"
              >
                <Icon name="save" className="h-4 w-4" />
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
                    className="w-12 rounded-md border border-ink/10 bg-parchment-50/80 px-1.5 py-1 text-center font-mono text-xs outline-none focus:border-accent-gold/70 focus:ring-2 focus:ring-accent-gold/30"
                  />
                  <button
                    onClick={() => applyHpChange(true)}
                    disabled={!hpInput}
                    className="rounded-md bg-combat-damage/10 px-1.5 py-1 font-mono text-[10px] font-semibold uppercase text-combat-damage transition-colors hover:bg-combat-damage hover:text-white disabled:opacity-50"
                    aria-label="Apply damage"
                  >
                    Dmg
                  </button>
                  <button
                    onClick={() => applyHpChange(false)}
                    disabled={!hpInput}
                    className="rounded-md bg-combat-heal/10 px-1.5 py-1 font-mono text-[10px] font-semibold uppercase text-combat-heal transition-colors hover:bg-combat-heal hover:text-white disabled:opacity-50"
                    aria-label="Apply healing"
                  >
                    Heal
                  </button>
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-1 flex items-center gap-0.5 md:mt-0">
                <button
                  onClick={() => setShowConditions(!showConditions)}
                  className={`btn-ghost btn-icon ${conditions.length > 0 ? 'text-combat-damage' : ''}`}
                  aria-label="Toggle conditions"
                  title="Conditions"
                >
                  <Icon name="bolt" className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {
                    setShowConcentration(!showConcentration)
                    setConcentrationInput(character.concentration ?? '')
                  }}
                  className={`btn-ghost btn-icon ${character.concentration ? 'text-combat-heal' : ''}`}
                  aria-label="Set concentration"
                  title="Concentration"
                >
                  <Icon name="spark" className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {
                    setEditingNotes(!editingNotes)
                    setNotesInput(character.notes ?? '')
                  }}
                  className={`btn-ghost btn-icon ${character.notes ? 'text-ink' : ''}`}
                  aria-label="Edit notes"
                  title="Notes"
                >
                  <Icon name="note" className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-ghost btn-icon"
                  aria-label="Edit character"
                  title="Edit"
                >
                  <Icon name="edit" className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleRemove}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-combat-damage transition-colors hover:bg-combat-damage hover:text-white"
                  aria-label="Remove character"
                >
                  <Icon name="x" className="h-3.5 w-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Condition Picker */}
      {showConditions && !isEditing && (
        <div className="mt-2 rounded-card border border-ink/10 bg-parchment-50/55 p-2">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="section-kicker">Conditions</span>
            <button onClick={() => setShowConditions(false)} className="text-xs text-ink-muted hover:text-ink">
              Close
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {CONDITIONS.map(condition => (
              <button
                key={condition}
                onClick={() => toggleCondition(condition)}
                className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
                  conditions.includes(condition)
                    ? 'bg-combat-damage text-white'
                    : 'bg-white/55 hover:bg-parchment-200'
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
        <div className="mt-2 rounded-card border border-combat-heal/25 bg-combat-heal/10 p-2">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="section-kicker text-combat-heal">Concentration</span>
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
              className="input flex-1 py-1.5 text-sm"
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
        <div className="mt-2 rounded-card border border-ink/10 bg-parchment-50/55 p-2">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="section-kicker">Notes</span>
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
            className="input min-h-24 resize-none text-sm"
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
