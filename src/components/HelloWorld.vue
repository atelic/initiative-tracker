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
    <button class="nextButton" @click.prevent="nextTurn">Next Turn</button>
    <div class="characterForm">
      <input
        type="text"
        placeholder="Name"
        v-model="characterName"
        @keyup.enter="addCharacter"
      />
      <button :disabled="!characterName" @click.prevent="addCharacter">
        Add
      </button>
    </div>
  </div>
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
      characterName: '',
      activeIndex: 0,
    };
  },
  methods: {
    addCharacter() {
      console.log(`adding: ${this.characterName}`);
      this.$store.dispatch('addCharacter', { name: this.characterName });
      this.characterName = '';
    },
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

input {
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 2rem;
  margin-right: 1rem;
  width: 16rem;
  height: 2rem;
  padding: 1rem 0.25rem;
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
