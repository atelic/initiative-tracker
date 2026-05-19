import { useState } from 'react'
import { useEncounter } from '../context/EncounterContext'
import { Icon } from './Icon'

export function CharacterForm() {
  const { dispatch } = useEncounter()
  const [formData, setFormData] = useState({
    name: '',
    initiative: '',
    armorClass: '',
    hp: '',
    isNPC: false,
  })

  const canSubmit = formData.name.trim() !== '' && formData.initiative !== ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

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

    // Reset form but keep isNPC toggle state for convenience
    setFormData({
      name: '',
      initiative: '',
      armorClass: '',
      hp: '',
      isNPC: formData.isNPC,
    })
  }

  return (
    <section className="card">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="section-kicker mb-1">Roster intake</p>
          <h2>Add Combatant</h2>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-parchment-50">
          <Icon name="plus" className="h-4 w-4" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Name */}
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="name" className="label">
              Name <span className="text-combat-damage">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Mara Vell, ash warden"
              className="input"
              required
            />
          </div>

          {/* Initiative */}
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="initiative" className="label">
              Initiative <span className="text-combat-damage">*</span>
            </label>
            <input
              type="number"
              id="initiative"
              value={formData.initiative}
              onChange={(e) => setFormData({ ...formData, initiative: e.target.value })}
              placeholder="18"
              className="input"
              required
            />
          </div>

          {/* Armor Class */}
          <div>
            <label htmlFor="armorClass" className="label">
              Armor Class
            </label>
            <input
              type="number"
              id="armorClass"
              value={formData.armorClass}
              onChange={(e) => setFormData({ ...formData, armorClass: e.target.value })}
              placeholder="16"
              className="input"
            />
          </div>

          {/* Hit Points */}
          <div>
            <label htmlFor="hp" className="label">
              Hit Points
            </label>
            <input
              type="number"
              id="hp"
              value={formData.hp}
              onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
              placeholder="42"
              className="input"
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-card border border-ink/10 bg-white/35 px-2.5 py-1.5">
          <label htmlFor="isNPC" className="text-xs font-medium text-ink">
            Mark as NPC or monster
          </label>
          <input
            type="checkbox"
            id="isNPC"
            checked={formData.isNPC}
            onChange={(e) => setFormData({ ...formData, isNPC: e.target.checked })}
            className="h-4 w-4 rounded border-ink/20 text-accent-gold focus:ring-accent-gold"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary w-full"
        >
          <Icon name="cross" className="h-4 w-4" />
          Add to Initiative
        </button>
      </form>
    </section>
  )
}
