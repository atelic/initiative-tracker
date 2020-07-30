<template>
  <div class="hello">
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
    <CharacterForm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import Character from '@/components/Character.vue';
import CharacterForm from '@/components/CharacterForm.vue';

export default Vue.extend({
  name: 'HelloWorld',
  components: { Character, CharacterForm },
  computed: mapGetters({ characters: 'charactersInitiativeSorted' }),
  data() {
    return {
      characterName: '',
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
  props: {
    msg: String,
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
  background-color: green;
  color: white;
  padding: 0.25rem;
  width: 4rem;
  border-radius: 0.5rem;

  &.nextButton {
    width: 6rem;
    background-color: #ffdf00;
    color: black;
  }
}

.character-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
