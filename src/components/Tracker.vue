<template>
  <section>
    <h1>Initiative Tracker</h1>
    <div class="character-list">
      <Character
        v-for="(character, idx) in characters"
        :key="`character-${idx}`"
        :character="character"
        :isActive="idx === activeIndex"
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
import { mapGetters } from 'vuex';

import Character from '@/components/Character.vue';

export default Vue.extend({
  name: 'HelloWorld',
  components: { Character },
  computed: mapGetters({ characters: 'charactersInitiativeSorted' }),
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    nextTurn() {
      const nextIndex =
        this.activeIndex === this.characters.length - 1
          ? 0
          : this.activeIndex + 1;
      this.activeIndex = nextIndex;
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
