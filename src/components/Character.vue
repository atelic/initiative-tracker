<template>
  <div :class="[isActive ? 'active' : '', 'character']">
    <h2>{{ character.name }} - {{ character.initiative }}</h2>
    <p>AC: {{ character.armorClass }} HP: {{ character.hp }}</p>
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
h2 {
  font-weight: 700;
  font-size: 1.25rem;
}

.character {
  background-color: gray;
  color: #e2e8f0;
  width: 30rem;
  border-radius: 1rem;
  margin: 1rem 0;
  padding: 0.5rem 0;
  &.active {
    color: #ffdf00;
  }
}

button {
  color: red;
  margin: 0.5rem 0;
}
</style>
