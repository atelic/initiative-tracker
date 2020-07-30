<template>
  <div class="grid grid-cols-1 lg:grid-cols-2">
    <section class="w-screen md:w-auto">
      <Tracker />
      <CharacterForm />
    </section>
    <section class="w-screen md:w-auto">
      <DiceRoller />
      <Notes />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import CharacterForm from '@/components/CharacterForm.vue';
import DiceRoller from '@/components/DiceRoller.vue';
import Notes from '@/components/Notes.vue';
import Tracker from '@/components/Tracker.vue';

export default Vue.extend({
  name: 'Home',
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
button {
  background-color: $green;
  color: $white;
  padding: 0.25rem;
  width: 4rem;
  border-radius: 0.5rem;

  &.nextButton {
    width: 6rem;
    background-color: $yellow;
    color: $black;
  }
}
</style>
