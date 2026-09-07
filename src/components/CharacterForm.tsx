import { useEffect, useRef, useState } from 'react'
import { useEncounter } from '../context/EncounterContext'
import { Icon } from './Icon'

interface CharacterFormProps {
  isOpen: boolean
  onClose: () => void
}

const initialForm = {
  name: '',
  initiative: '',
  armorClass: '',
  hp: '',
  isNPC: false,
}

export function CharacterForm({ isOpen, onClose }: CharacterFormProps) {
  const { dispatch } = useEncounter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (isOpen) {
      dialog?.showModal()
      dialog?.querySelector<HTMLInputElement>('#name')?.focus()
    }
    else dialog?.close()
  }, [isOpen])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!formData.name.trim()) {
      setError('Enter a name for this combatant.')
      return
    }
    if (formData.initiative === '') {
      setError('Initiative is required to place them in the order.')
      return
    }

    dispatch({
      type: 'ADD_CHARACTER',
      payload: {
        id: crypto.randomUUID(),
        name: formData.name.trim(),
        initiative: Number(formData.initiative),
        armorClass: formData.armorClass ? Number(formData.armorClass) : undefined,
        hp: formData.hp ? Number(formData.hp) : undefined,
        maxHp: formData.hp ? Number(formData.hp) : undefined,
        isNPC: formData.isNPC,
      },
    })

    setFormData({ ...initialForm, isNPC: formData.isNPC })
    setError('')
    onClose()
  }

  return (
    <dialog ref={dialogRef} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} className="summon-overlay" aria-modal="true" aria-labelledby="summon-title">
      <section className="summon-drawer">
            <div className="summon-heading">
              <div>
                <h2 id="summon-title" className="mt-2 text-3xl">Add combatant</h2>
              </div>
              <button type="button" onClick={onClose} className="icon-button" aria-label="Close add combatant panel">
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="summon-form">
              <div className="field-block">
                <label htmlFor="name" className="label">Name <span>Required</span></label>
                <input id="name" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="Mara Vell, ash warden" className="input input-large" autoFocus />
                <p className="field-helper">This name appears in the turn order.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="field-block">
                  <label htmlFor="initiative" className="label">Initiative <span>Required</span></label>
                  <input type="number" id="initiative" required value={formData.initiative} onChange={(event) => setFormData({ ...formData, initiative: event.target.value })} placeholder="18" className="input font-mono" />
                </div>
                <div className="field-block">
                  <label htmlFor="armorClass" className="label">Armor class</label>
                  <input type="number" id="armorClass" min="0" value={formData.armorClass} onChange={(event) => setFormData({ ...formData, armorClass: event.target.value })} placeholder="16" className="input font-mono" />
                </div>
              </div>

              <div className="field-block">
                <label htmlFor="hp" className="label">Hit points</label>
                <input type="number" id="hp" min="0" value={formData.hp} onChange={(event) => setFormData({ ...formData, hp: event.target.value })} placeholder="42" className="input font-mono" />
                <p className="field-helper">Used as both current and maximum HP.</p>
              </div>

              <fieldset>
                <legend className="label">Side</legend>
                <div className="grid grid-cols-2 gap-3">
                  <label className="allegiance-option">
                    <input type="radio" name="side" value="ally" checked={!formData.isNPC} onChange={() => setFormData({ ...formData, isNPC: false })} />
                    <Icon name="shield" className="h-4 w-4 shrink-0" />
                    Player / ally
                  </label>
                  <label className="allegiance-option">
                    <input type="radio" name="side" value="hostile" checked={formData.isNPC} onChange={() => setFormData({ ...formData, isNPC: true })} />
                    <Icon name="sword" className="h-4 w-4 shrink-0" />
                    Hostile
                  </label>
                </div>
              </fieldset>

              {error ? <p className="form-error" role="alert">{error}</p> : null}

              <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary"><Icon name="plus" className="h-4 w-4" /> Add combatant</button>
              </div>
            </form>
      </section>
    </dialog>
  )
}
