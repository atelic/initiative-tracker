<template>
  <div :class="[isActive ? 'active' : '', 'character']">
    <p class="heading-2">
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
$character-bg-color: $gray500;

.character {
  background-color: $character-bg-color;
  color: $white;
  width: 100vw;
  margin: 0 1rem 1rem 1rem;

  @media (min-width: $lg) {
    width: 30rem;
    margin: 0 0 1rem 0;
  }

  border-radius: 1rem;
  padding: 0.5rem 0;
  &.active {
    color: $secondary;
  }
}

input {
  width: 2rem;
  background-color: $character-bg-color;
}

button {
  color: $red;
  margin: 0.5rem 0;
}
</style>
