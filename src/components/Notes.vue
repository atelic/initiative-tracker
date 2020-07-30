<template>
  <section>
    <h1>Notes</h1>
    <textarea v-model="noteText"></textarea>
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
h1 {
  font-weight: 700;
  font-size: 1.75rem;
  margin: 2rem 0;
}

textarea {
  border: 1px solid black;
  border-radius: 10px;
  resize: none;
  height: 100vw;
  width: 40rem;
  padding: 1rem;
}
</style>
