<template>
  <section>
    <h1>Roll Dice</h1>
    <pre v-if="diceResult">{{ diceResult }}</pre>
    <input
      v-model="diceString"
      placeholder="e.g. 4d6"
      @keyup.enter="roll"
      @blur="clearIfEmpty"
    />
    <button :disabled="diceString === ''" @click.prevent="roll">Roll</button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { DiceRoller } from 'rpg-dice-roller';

const roller = new DiceRoller();

export default Vue.extend({
  name: 'DiceRoller',
  data() {
    return {
      diceString: '',
      diceResult: '',
    };
  },
  methods: {
    roll(): void {
      this.clearIfEmpty();
      const result = roller.roll(this.diceString);
      this.diceResult = result.toString();
    },
    clearIfEmpty(): void {
      if (!this.diceString) {
        this.diceResult = '';
      }
    },
  },
});
</script>

<style scoped lang="scss">
h1 {
  font-weight: 700;
  font-size: 1.75rem;
  margin: 2rem 0;
}

input {
  border: 1px solid black;
  border-radius: 5px;
  width: 10rem;
  padding: 0.5rem;
}
button {
  background-color: green;
  color: white;
  padding: 0.25rem;
  width: 4rem;
  border-radius: 0.5rem;
  margin-left: 1rem;
}
</style>
