<template>
  <section>
    <h1>Initiative Tracker</h1>
    <div class="character-list">
      <Character
        v-for="(character, idx) in characters"
        :key="`character-${idx}`"
        :character="character"
        :isActive="idx === currentTurn"
      />
    </div>
    <button
      v-if="characters.length !== 0"
      class="nextButton"
      @click.prevent="nextTurn"
    >
      Next Turn
    </button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapState } from 'vuex';

import { RootState } from '@/store/models';
import Character from '@/components/Character.vue';

export default Vue.extend({
  name: 'HelloWorld',
  components: { Character },
  computed: {
    ...mapGetters({ characters: 'charactersInitiativeSorted' }),
    ...mapState(['currentTurn']),
  },
  methods: {
    nextTurn(): void {
      const nextIndex =
        this.currentTurn === this.characters.length - 1
          ? 0
          : this.currentTurn + 1;
      this.$store.dispatch('setCurrentTurn', nextIndex);
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

button {
  background-color: #ffdf00;
  color: black;
  padding: 0.25rem;
  width: 6rem;
  border-radius: 0.5rem;
}

.character-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
