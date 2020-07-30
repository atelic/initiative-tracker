<template>
  <section class="home-page">
    <div class="column m-1 w-half">
      <Tracker />
      <CharacterForm />
    </div>
    <div class="column">
      <DiceRoller />
      <Notes />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import CharacterForm from '@/components/CharacterForm.vue';
import DiceRoller from '@/components/DiceRoller.vue';
import Notes from '@/components/Notes.vue';
import Tracker from '@/components/Tracker.vue';

export default Vue.extend({
  name: 'HelloWorld',
  components: { CharacterForm, DiceRoller, Notes, Tracker },
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

.home-page {
  display: flex;
}

.m-1 {
  margin: 1rem;
}

.w-half {
  width: 50%;
}

.row {
  flex-direction: row;
  flex-wrap: wrap;
}

.column {
  display: flex;
  flex-direction: column;
}
</style>
