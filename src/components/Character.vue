<template>
  <div :class="[isActive ? 'active' : '', 'character']">
    <h2>{{ character.name }} - {{ character.initiative }}</h2>
    <p>AC: {{ character.armorClass }} HP: {{ character.hp }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Character } from '@/store/models';

export default Vue.extend({
  name: 'Character',
  props: {
    character: {
      type: Object as () => Character,
    },
    isActive: Boolean,
  },
});
</script>

<style scoped lang="scss">
.character {
  background-color: gray;
  color: #e2e8f0;
  width: 20rem;
  border-radius: 1rem;
  margin: 1rem 0;
  &.active {
    color: #ffdf00;
  }
}
</style>
