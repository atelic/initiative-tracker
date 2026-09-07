import { useEffect, useRef, useState } from 'react'
import { useEncounter } from '../context/EncounterContext'
import type { EncounterPreset, PresetCharacter } from '../types'
import { Icon } from './Icon'

export function PresetManager() {
  const { state, dispatch, sortedCharacters } = useEncounter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'save' | 'load'>('load')
  const [presetName, setPresetName] = useState('')
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isModalOpen) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [isModalOpen])

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
    if (mode === 'replace' && state.characters.length > 0 && !window.confirm('Replace the current combatants with this preset?')) return
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
      <div className="mb-5 flex items-start justify-between gap-3 border-b border-brass-400/20 pb-4">
        <div>
          <h2>Saved Presets</h2>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded border border-white/[0.1] text-brass-200">
          <Icon name="save" className="h-4 w-4" />
        </div>
      </div>

      <div className="mb-3 flex gap-2">
        <button
          onClick={openSaveModal}
          disabled={sortedCharacters.length === 0}
          className="btn-secondary btn-sm flex-1"
        >
          <Icon name="save" className="h-4 w-4" />
          Save Current
        </button>
        <button
          onClick={openLoadModal}
          disabled={state.presets.length === 0}
          className="btn-secondary btn-sm flex-1"
        >
          <Icon name="book" className="h-4 w-4" />
          Load Preset
        </button>
      </div>

      {state.presets.length > 0 && (
        <div className="space-y-2">
          {state.presets.slice(-3).reverse().map(preset => (
            <button
              key={preset.id}
              onClick={() => handleLoadPreset(preset, 'replace')}
              className="w-full border border-brass-400/20 bg-white/[0.025] p-3 text-left text-sm transition-colors hover:border-brass-300/35 hover:bg-brass-500/10"
            >
              <span className="font-semibold">{preset.name}</span>
              <span className="ml-2 font-mono text-xs text-ink-muted">
                ({preset.characters.length} characters)
              </span>
            </button>
          ))}
        </div>
      )}

      {state.presets.length === 0 && (
        <p className="border border-dashed border-brass-400/20 bg-white/[0.02] px-4 py-7 text-center text-xs leading-5 text-ink-muted">
          No saved presets yet. Add characters and save them as a preset for quick access.
        </p>
      )}

      <dialog ref={dialogRef} className="preset-dialog" aria-modal="true" aria-label={modalMode === 'save' ? 'Save preset' : 'Load preset'} onCancel={() => setIsModalOpen(false)} onClick={event => { if (event.target === event.currentTarget) setIsModalOpen(false) }}>
          <div
            className="modal-panel max-h-[80vh] w-full max-w-md overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {modalMode === 'save' ? (
              <>
                <h2 className="mb-3">Save Preset</h2>

                <div className="mb-3">
                  <label htmlFor="presetName" className="label">
                    Preset Name
                  </label>
                  <input
                    type="text"
                    id="presetName"
                    value={presetName}
                    onChange={e => setPresetName(e.target.value)}
                    placeholder="Crypt stairs, second watch"
                    className="input"
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <p className="label">Characters to Include</p>
                  <div className="max-h-48 space-y-1.5 overflow-y-auto">
                    {sortedCharacters.map(character => (
                      <label
                        key={character.id}
                        className="flex cursor-pointer items-center gap-2 rounded-md bg-brass-500/5 p-2 hover:bg-brass-500/10"
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
                <h2 className="mb-3">Load Preset</h2>

                <div className="mb-3 space-y-2">
                  {state.presets.map(preset => (
                    <div
                      key={preset.id}
                      className="rounded-card border border-ink/10 bg-brass-500/5 p-2.5"
                    >
                      <div className="mb-2 flex items-start justify-between">
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
                          <Icon name="trash" className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mb-2 text-xs text-ink-muted">
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
      </dialog>
    </section>
  )
}
