<template>
  <section>
    <h1 class="my-2">Initiative Tracker</h1>
    <div class="flex flex-col items-center">
      <Character
        v-for="(character, idx) in characters"
        :key="`character-${idx}`"
        :character="character"
        :isActive="idx === currentTurn"
      />
    </div>
    <button
      v-if="characters.length !== 0"
      class="button secondary w-6"
      @click.prevent="nextTurn"
    >
      Next Turn
    </button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapState } from 'vuex';

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
      // If a character has been removed, make sure currentTurn
      // stays inside the length of the character array
      const nextIndex =
        this.currentTurn === this.characters.length - 1 ||
        this.currentTurn >= this.characters.length
          ? 0
          : this.currentTurn + 1;
      this.$store.dispatch('setCurrentTurn', nextIndex);
    },
  },
});
</script>
