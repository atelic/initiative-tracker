import { useEffect, useRef, useState } from 'react'
import { useEncounter } from '../context/EncounterContext'
import type { Character } from '../types'
import { CONDITIONS } from '../types'
import { Icon } from './Icon'

function getHpPercentage(character: Character) {
  if (!character.maxHp || character.hp === undefined) return null
  return Math.min(100, Math.max(0, (character.hp / character.maxHp) * 100))
}

function getHealthState(percentage: number | null) {
  if (percentage === null) return 'unknown'
  if (percentage <= 25) return 'critical'
  if (percentage <= 50) return 'bloodied'
  return 'steady'
}

export function CharacterCard({ character }: { character: Character }) {
  const { dispatch } = useEncounter()
  const [isEditing, setIsEditing] = useState(false)
  const [openPanel, setOpenPanel] = useState<'conditions' | 'concentration' | 'notes' | null>(null)
  const [hpInput, setHpInput] = useState('')
  const [notesInput, setNotesInput] = useState(character.notes ?? '')
  const [concentrationInput, setConcentrationInput] = useState(character.concentration ?? '')
  const [conSaveAlert, setConSaveAlert] = useState<number | null>(null)
  const [editError, setEditError] = useState('')
  const [editValues, setEditValues] = useState({
    name: character.name,
    initiative: character.initiative,
    armorClass: character.armorClass ?? '',
    hp: character.hp ?? '',
    maxHp: character.maxHp ?? '',
  })
  const nameInputRef = useRef<HTMLInputElement>(null)
  const concentrationTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (isEditing) {
      nameInputRef.current?.focus()
      nameInputRef.current?.select()
    }
  }, [isEditing])

  useEffect(() => () => {
    if (concentrationTimerRef.current) window.clearTimeout(concentrationTimerRef.current)
  }, [])

  const hpPercentage = getHpPercentage(character)
  const healthState = getHealthState(hpPercentage)
  const conditions = character.conditions ?? []
  const isDown = character.hp === 0 && !character.isNPC
  const deathSaves = character.deathSaves ?? { successes: 0, failures: 0 }

  const saveEdit = () => {
    if (!editValues.name.trim()) {
      setEditError('A combatant must have a name.')
      return
    }
    if ([editValues.initiative, editValues.armorClass, editValues.hp, editValues.maxHp].some(value => value !== '' && !Number.isSafeInteger(Number(value))) || [editValues.armorClass, editValues.hp, editValues.maxHp].some(value => value !== '' && Number(value) < 0)) {
      setEditError('Use whole numbers; armor and hit points cannot be negative.')
      return
    }
    dispatch({
      type: 'UPDATE_CHARACTER',
      payload: {
        ...character,
        name: editValues.name.trim(),
        initiative: Number(editValues.initiative) || 0,
        armorClass: editValues.armorClass !== '' ? Number(editValues.armorClass) : undefined,
        hp: editValues.hp !== '' ? Number(editValues.hp) : undefined,
        maxHp: editValues.maxHp !== '' ? Number(editValues.maxHp) : undefined,
      },
    })
    setEditError('')
    setIsEditing(false)
  }

  const applyHpChange = (isDamage: boolean) => {
    const amount = Number(hpInput)
    if (!Number.isSafeInteger(amount) || amount <= 0) return
    const newHp = isDamage
      ? Math.max(0, (character.hp ?? 0) - amount)
      : Math.min(character.maxHp ?? Infinity, (character.hp ?? 0) + amount)

    if (isDamage && character.concentration) {
      setConSaveAlert(Math.max(10, Math.floor(amount / 2)))
      if (concentrationTimerRef.current) window.clearTimeout(concentrationTimerRef.current)
      concentrationTimerRef.current = window.setTimeout(() => setConSaveAlert(null), 5000)
    }

    dispatch({
      type: 'UPDATE_CHARACTER',
      payload: { ...character, hp: newHp, deathSaves: newHp > 0 ? undefined : character.deathSaves },
    })
    setHpInput('')
  }

  const toggleCondition = (condition: string) => {
    const next = conditions.includes(condition)
      ? conditions.filter((item) => item !== condition)
      : [...conditions, condition]
    dispatch({ type: 'UPDATE_CHARACTER', payload: { ...character, conditions: next.length ? next : undefined } })
  }

  const updateDeathSave = (type: 'successes' | 'failures', index: number) => {
    const value = index < deathSaves[type] ? index : index + 1
    dispatch({
      type: 'UPDATE_CHARACTER',
      payload: { ...character, deathSaves: { ...deathSaves, [type]: value } },
    })
  }

  const togglePanel = (panel: typeof openPanel) => setOpenPanel((current) => current === panel ? null : panel)

  return (
    <article className={`combatant-stage-card health-${healthState}`}>
      <div className="combatant-title-row">
        <div className="min-w-0">
          {isEditing ? (
            <div>
              <input
                ref={nameInputRef}
                value={editValues.name}
                onChange={(event) => setEditValues({ ...editValues, name: event.target.value })}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') saveEdit()
                  if (event.key === 'Escape') setIsEditing(false)
                }}
                className="input text-xl font-semibold"
                aria-label="Combatant name"
              />
              {editError ? <p className="field-error">{editError}</p> : null}
            </div>
          ) : (
            <h2 className="break-words text-3xl md:text-4xl">{character.name}</h2>
          )}
          {!isEditing ? <p className="mt-2 text-sm text-vellum-400">{character.isNPC ? 'Hostile creature' : 'Player or ally'}</p> : null}
        </div>
        <div className="initiative-medallion">
          <span>Initiative</span>
          {isEditing ? (
            <input
              type="number"
              value={editValues.initiative}
              onChange={(event) => setEditValues({ ...editValues, initiative: Number(event.target.value) })}
              className="w-16 bg-transparent text-center font-mono text-3xl font-semibold outline-none"
              aria-label="Initiative"
            />
          ) : <strong>{character.initiative}</strong>}
        </div>
      </div>

      <div className="combatant-stats">
        <div>
          <span><Icon name="shield" className="h-4 w-4" /> Armor</span>
          {isEditing ? (
            <input type="number" value={editValues.armorClass} onChange={(event) => setEditValues({ ...editValues, armorClass: event.target.value })} className="stat-input" aria-label="Armor class" />
          ) : <strong>{character.armorClass ?? '—'}</strong>}
        </div>
        <div className="hp-stat">
          <span><Icon name="heart" className="h-4 w-4" /> Vitality</span>
          {isEditing ? (
            <span className="flex items-center gap-1">
              <input type="number" value={editValues.hp} onChange={(event) => setEditValues({ ...editValues, hp: event.target.value })} className="stat-input" aria-label="Current hit points" />
              <i>/</i>
              <input type="number" value={editValues.maxHp} onChange={(event) => setEditValues({ ...editValues, maxHp: event.target.value })} className="stat-input" aria-label="Maximum hit points" />
            </span>
          ) : <strong>{character.hp ?? '—'}<i> / {character.maxHp ?? '—'}</i></strong>}
        </div>
        <div>
          <span>State</span>
          <strong className={`health-word ${healthState}`}>{isDown ? 'Fallen' : healthState}</strong>
        </div>
      </div>

      {hpPercentage !== null ? (
        <div className="vitality-track" aria-label={`${Math.round(hpPercentage)} percent hit points`}>
          <span style={{ transform: `scaleX(${hpPercentage / 100})` }} />
        </div>
      ) : null}

      {character.concentration || conditions.length > 0 ? (
        <div className="status-runes">
          {character.concentration ? <span className="concentration-rune"><Icon name="spark" className="h-3.5 w-3.5" /> {character.concentration}</span> : null}
          {conditions.map((condition) => <span key={condition}>{condition}</span>)}
        </div>
      ) : null}

      {conSaveAlert !== null ? (
        <div className="concentration-alert" role="status">
          <Icon name="spark" className="h-4 w-4" />
          Hold concentration · Constitution save DC {conSaveAlert}
        </div>
      ) : null}

      {isDown ? (
        <div className="death-ledger">
          <p className="text-sm text-combat-damage">Death saves</p>
          {(['successes', 'failures'] as const).map((type) => (
            <div key={type}>
              <span>{type === 'successes' ? 'Mercy' : 'Doom'}</span>
              {[0, 1, 2].map((index) => (
                <button key={index} type="button" onClick={() => updateDeathSave(type, index)} className={index < deathSaves[type] ? `is-${type}` : ''} aria-label={`${type} ${index + 1}`} />
              ))}
            </div>
          ))}
        </div>
      ) : null}

      {!isEditing && character.hp !== undefined ? (
        <div className="hp-command">
          <label htmlFor={`hp-${character.id}`}>Change vitality</label>
          <div>
            <input id={`hp-${character.id}`} type="number" min="1" value={hpInput} onChange={(event) => setHpInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && applyHpChange(true)} placeholder="Amount" className="input" />
            <button type="button" onClick={() => applyHpChange(true)} disabled={!hpInput} className="btn-damage">Damage</button>
            <button type="button" onClick={() => applyHpChange(false)} disabled={!hpInput} className="btn-heal">Heal</button>
          </div>
        </div>
      ) : null}

      <div className="combatant-actions">
        {isEditing ? (
          <>
            <button type="button" onClick={() => setIsEditing(false)} className="btn-ghost">Cancel</button>
            <button type="button" onClick={saveEdit} className="btn-primary"><Icon name="save" className="h-4 w-4" /> Seal changes</button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => togglePanel('conditions')} className={openPanel === 'conditions' ? 'is-selected' : ''}><Icon name="bolt" className="h-4 w-4" /> Conditions</button>
            <button type="button" onClick={() => { setConcentrationInput(character.concentration ?? ''); togglePanel('concentration') }} className={openPanel === 'concentration' ? 'is-selected' : ''}><Icon name="spark" className="h-4 w-4" /> Concentration</button>
            <button type="button" onClick={() => { setNotesInput(character.notes ?? ''); togglePanel('notes') }} className={openPanel === 'notes' ? 'is-selected' : ''}><Icon name="note" className="h-4 w-4" /> Notes</button>
            <button type="button" onClick={() => { setEditValues({ name: character.name, initiative: character.initiative, armorClass: character.armorClass ?? '', hp: character.hp ?? '', maxHp: character.maxHp ?? '' }); setEditError(''); setIsEditing(true) }}><Icon name="edit" className="h-4 w-4" /> Edit</button>
            <button type="button" onClick={() => dispatch({ type: 'REMOVE_CHARACTER', payload: character.id })} className="danger-action" aria-label={`Remove ${character.name}`}><Icon name="trash" className="h-4 w-4" /></button>
          </>
        )}
      </div>

      {openPanel === 'conditions' ? (
        <div className="detail-drawer">
          <div className="drawer-heading"><span>Mark conditions</span><button type="button" onClick={() => setOpenPanel(null)}>Close</button></div>
          <div className="condition-grid">
            {CONDITIONS.map((condition) => <button type="button" key={condition} onClick={() => toggleCondition(condition)} className={conditions.includes(condition) ? 'is-selected' : ''}>{condition}</button>)}
          </div>
        </div>
      ) : null}

      {openPanel === 'concentration' ? (
        <div className="detail-drawer">
          <label htmlFor={`focus-${character.id}`} className="label">Spell or effect</label>
          <div className="flex gap-2">
            <input id={`focus-${character.id}`} value={concentrationInput} onChange={(event) => setConcentrationInput(event.target.value)} placeholder="Moonbeam, hex, ward..." className="input flex-1" autoFocus />
            <button type="button" onClick={() => { dispatch({ type: 'UPDATE_CHARACTER', payload: { ...character, concentration: concentrationInput.trim() || undefined } }); setOpenPanel(null) }} className="btn-primary">Set focus</button>
          </div>
        </div>
      ) : null}

      {openPanel === 'notes' ? (
        <div className="detail-drawer">
          <label htmlFor={`notes-${character.id}`} className="label">Combatant notes</label>
          <textarea id={`notes-${character.id}`} value={notesInput} onChange={(event) => setNotesInput(event.target.value)} placeholder="Resistances, vows, grudges, hidden reactions..." className="input min-h-24 resize-y" autoFocus />
          <div className="mt-2 flex justify-end"><button type="button" onClick={() => { dispatch({ type: 'UPDATE_CHARACTER', payload: { ...character, notes: notesInput.trim() || undefined } }); setOpenPanel(null) }} className="btn-primary">Keep note</button></div>
        </div>
      ) : null}
    </article>
  )
}

export function CharacterRow({ character, isActive, position }: { character: Character; isActive: boolean; position: number }) {
  const healthState = getHealthState(getHpPercentage(character))
  return (
    <li>
      <div className={`rail-combatant ${isActive ? 'is-active' : ''}`} aria-current={isActive ? 'step' : undefined}>
        <span className="rail-position">{String(position).padStart(2, '0')}</span>
        <span className="initiative-gem">{character.initiative}</span>
        <span className="min-w-0 flex-1">
          <strong className="block truncate">{character.name}</strong>
          <span className="mt-1 flex items-center gap-2 text-xs text-vellum-400">
            {character.isNPC ? 'Hostile' : 'Ally'}
            {healthState !== 'unknown' ? `· ${healthState}` : ''}
          </span>
        </span>
        {isActive ? <span className="active-notch" aria-label="Active turn" /> : null}
      </div>
    </li>
  )
}
