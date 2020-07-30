<template>
  <section>
    <h1 class="mt-2">Notes</h1>
    <textarea class="p-1 rounded-lg" v-model="noteText"></textarea>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Notes',
  computed: {
    ...mapState(['notes']),
    noteText: {
      get() {
        return this.notes;
      },
      set(val) {
        this.$store.dispatch('setNotes', val);
      },
    },
  },
});
</script>

<style scoped lang="scss">
textarea {
  border: 1px solid $black;
  resize: none;
  width: 100vw;
  height: 100vw;
  @media (min-width: $lg) {
    width: 40rem;
    height: auto;
  }
  font-family: 'Courier New', Courier, monospace;
}
</style>
