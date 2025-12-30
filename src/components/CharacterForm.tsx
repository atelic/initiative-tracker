import { useState } from 'react'
import { useEncounter } from '../context/EncounterContext'

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
      <h2 className="mb-4">Add Character</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
              placeholder="Character name"
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
              placeholder="Roll result"
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
              placeholder="AC"
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
              placeholder="HP"
              className="input"
            />
          </div>
        </div>

        {/* NPC Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isNPC"
            checked={formData.isNPC}
            onChange={(e) => setFormData({ ...formData, isNPC: e.target.checked })}
            className="w-4 h-4 rounded border-parchment-400 text-accent-gold focus:ring-accent-gold"
          />
          <label htmlFor="isNPC" className="text-sm text-ink-muted">
            This is an NPC/Monster
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary w-full"
        >
          Add to Initiative
        </button>
      </form>
    </section>
  )
}
