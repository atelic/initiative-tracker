<template>
  <div :class="[isActive ? 'active' : '', 'character']">
    <p class="heading">
      {{ character.name }} -
      <input
        v-model="character.initiative"
        @blur.prevent="updateCharacter"
        @keyup.enter="updateCharacter"
      />
    </p>
    <p>
      AC:
      <input
        v-model="character.armorClass"
        @blur.prevent="updateCharacter"
        @keyup.enter="updateCharacter"
      />
    </p>
    <p>
      HP:
      <input
        v-model="character.hp"
        @blur.prevent="updateCharacter"
        @keyup.enter="updateCharacter"
      />
    </p>
    <button @click.prevent="removeCharacter">Remove</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Character } from '@/store/models';

export default Vue.extend({
  name: 'Character',
  methods: {
    removeCharacter(): void {
      this.$store.dispatch('removeCharacter', this.character);
    },
    updateCharacter(): void {
      this.$store.dispatch('updateCharacter', this.character);
    },
  },
  props: {
    character: {
      type: Object as () => Character,
    },
    isActive: Boolean,
  },
});
</script>

<style scoped lang="scss">
.heading {
  font-weight: 700;
  font-size: 1.25rem;
}

.character {
  background-color: gray;
  color: #e2e8f0;
  width: 30rem;
  border-radius: 1rem;
  margin: 0 0 1rem 0;
  padding: 0.5rem 0;
  &.active {
    color: #ffdf00;
  }
}

input {
  width: 2rem;
  background-color: gray;
}

button {
  color: red;
  margin: 0.5rem 0;
}
</style>
