import assert from 'node:assert/strict'
import { encounterReducer as reduce, initialState } from '../src/context/encounter.ts'

const a = { id: 'a', name: 'Warden', initiative: 12 }
const b = { id: 'b', name: 'Reaver', initiative: 8 }
let state = { ...initialState, characters: [a, b], currentTurnIndex: 1 }
state = reduce(state, { type: 'ADD_CHARACTER', payload: { id: 'c', name: 'Drake', initiative: 20 } })
assert.equal(state.currentTurnIndex, 2, 'Adding a faster combatant preserves the active turn')
state = reduce(state, { type: 'UPDATE_CHARACTER', payload: { ...b, initiative: 25 } })
assert.equal(state.currentTurnIndex, 0, 'Editing initiative follows the active combatant')
state = reduce(state, { type: 'REMOVE_CHARACTER', payload: 'missing' })
assert.equal(state.currentTurnIndex, 0, 'Removing an unknown ID is harmless')
state = reduce(state, { type: 'PREVIOUS_TURN' })
assert.equal(state.currentTurnIndex, 2)
state = reduce(state, { type: 'NEXT_TURN' })
assert.equal(state.roundNumber, 2)
state = reduce(state, { type: 'RESET_ENCOUNTER' })
assert.equal(state.characters.length, 0)
assert.equal(state.roundNumber, 1)
assert.equal(reduce(state, { type: 'NEXT_TURN' }), state)
console.log('Encounter regression checks passed')
