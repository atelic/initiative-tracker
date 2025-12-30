import { useState } from 'react'
import { useEncounter } from '../context/EncounterContext'
import type { EncounterPreset, PresetCharacter } from '../types'

export function PresetManager() {
  const { state, dispatch, sortedCharacters } = useEncounter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'save' | 'load'>('load')
  const [presetName, setPresetName] = useState('')
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(new Set())

  const openSaveModal = () => {
    setModalMode('save')
    setPresetName('')
    setSelectedCharacters(new Set(sortedCharacters.map(c => c.id)))
    setIsModalOpen(true)
  }

  const openLoadModal = () => {
    setModalMode('load')
    setIsModalOpen(true)
  }

  const handleSavePreset = () => {
    if (!presetName.trim() || selectedCharacters.size === 0) return

    const characters: PresetCharacter[] = sortedCharacters
      .filter(c => selectedCharacters.has(c.id))
      .map(c => ({
        name: c.name,
        armorClass: c.armorClass,
        maxHp: c.maxHp ?? c.hp,
        isNPC: c.isNPC ?? false,
      }))

    const preset: EncounterPreset = {
      id: crypto.randomUUID(),
      name: presetName.trim(),
      characters,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    dispatch({ type: 'SAVE_PRESET', payload: preset })
    setIsModalOpen(false)
  }

  const handleLoadPreset = (preset: EncounterPreset, mode: 'replace' | 'add') => {
    dispatch({ type: 'LOAD_PRESET', payload: { preset, mode } })
    setIsModalOpen(false)
  }

  const handleDeletePreset = (presetId: string) => {
    if (window.confirm('Delete this preset?')) {
      dispatch({ type: 'DELETE_PRESET', payload: presetId })
    }
  }

  const toggleCharacter = (id: string) => {
    const newSet = new Set(selectedCharacters)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelectedCharacters(newSet)
  }

  return (
    <section className="card">
      <h2 className="mb-4">Encounter Presets</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={openSaveModal}
          disabled={sortedCharacters.length === 0}
          className="btn-secondary flex-1"
        >
          Save Current
        </button>
        <button
          onClick={openLoadModal}
          disabled={state.presets.length === 0}
          className="btn-secondary flex-1"
        >
          Load Preset
        </button>
      </div>

      {/* Quick access to recent presets */}
      {state.presets.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-ink-muted uppercase tracking-wider">Recent</p>
          {state.presets.slice(-3).reverse().map(preset => (
            <button
              key={preset.id}
              onClick={() => handleLoadPreset(preset, 'replace')}
              className="w-full text-left p-2 rounded bg-parchment-100 hover:bg-parchment-200 transition-colors"
            >
              <span className="font-medium">{preset.name}</span>
              <span className="text-xs text-ink-muted ml-2">
                ({preset.characters.length} characters)
              </span>
            </button>
          ))}
        </div>
      )}

      {state.presets.length === 0 && (
        <p className="text-sm text-ink-muted text-center py-4">
          No saved presets yet. Add characters and save them as a preset for quick access.
        </p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-ink/50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="card max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {modalMode === 'save' ? (
              <>
                <h2 className="mb-4">Save Preset</h2>

                <div className="mb-4">
                  <label htmlFor="presetName" className="label">
                    Preset Name
                  </label>
                  <input
                    type="text"
                    id="presetName"
                    value={presetName}
                    onChange={e => setPresetName(e.target.value)}
                    placeholder="e.g., Goblin Ambush"
                    className="input"
                    autoFocus
                  />
                </div>

                <div className="mb-4">
                  <p className="label">Characters to Include</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {sortedCharacters.map(character => (
                      <label
                        key={character.id}
                        className="flex items-center gap-2 p-2 rounded bg-parchment-100 hover:bg-parchment-200 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCharacters.has(character.id)}
                          onChange={() => toggleCharacter(character.id)}
                          className="w-4 h-4 rounded border-parchment-400 text-accent-gold focus:ring-accent-gold"
                        />
                        <span>{character.name}</span>
                        {character.isNPC && (
                          <span className="text-xs text-ink-muted">(NPC)</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreset}
                    disabled={!presetName.trim() || selectedCharacters.size === 0}
                    className="btn-primary flex-1"
                  >
                    Save Preset
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-4">Load Preset</h2>

                <div className="space-y-3 mb-4">
                  {state.presets.map(preset => (
                    <div
                      key={preset.id}
                      className="p-3 rounded bg-parchment-100 border border-parchment-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{preset.name}</h3>
                          <p className="text-xs text-ink-muted">
                            {preset.characters.length} characters
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeletePreset(preset.id)}
                          className="btn-ghost btn-sm text-combat-damage"
                          aria-label="Delete preset"
                        >
                          ×
                        </button>
                      </div>

                      <div className="text-xs text-ink-muted mb-3">
                        {preset.characters.map(c => c.name).join(', ')}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLoadPreset(preset, 'replace')}
                          className="btn-primary btn-sm flex-1"
                        >
                          Replace
                        </button>
                        <button
                          onClick={() => handleLoadPreset(preset, 'add')}
                          className="btn-secondary btn-sm flex-1"
                        >
                          Add to Current
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary w-full"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
