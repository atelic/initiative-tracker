<template>
  <div>
    <form class="characterForm">
      <h1>Add Character</h1>
      <div class="row">
        <input
          id="name"
          type="text"
          placeholder="Name"
          v-model="character.name"
        />
        <input
          id="ac"
          type="text"
          placeholder="AC"
          v-model="character.armorClass"
        />
      </div>
      <div class="row">
        <input id="hp" type="text" placeholder="HP" v-model="character.hp" />
        <input
          id="hp"
          type="text"
          placeholder="Initiative"
          v-model="character.initiative"
        />
      </div>
      <div class="row">
        <button :disabled="!canSubmit" @click.prevent="addCharacter">
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

const defaultCharacter = {
  name: '',
  armorClass: undefined,
  hp: undefined,
  initiative: undefined,
};

export default Vue.extend({
  name: 'CharacterForm',
  data() {
    return {
      character: Object.assign({}, defaultCharacter),
    };
  },
  computed: {
    canSubmit(): boolean {
      return this.character.name !== '' && this.character.initiative !== '';
    },
    ...mapState(['characters']),
  },
  methods: {
    addCharacter(): void {
      console.log(`adding: ${this.character.name}`);
      this.$store.dispatch('addCharacter', {
        ...this.character,
        armorClass: Number(this.character.armorClass),
        hp: Number(this.character.hp),
        initiative: Number(this.character.initiative),
        id: this.characters.length + 1,
      });
      this.clearCharacter();
    },
    clearCharacter(): void {
      this.character = Object.assign({}, defaultCharacter);
    },
  },
});
</script>

<style scoped lang="scss">
h1 {
  font-weight: 700;
  font-size: 1.5rem;
}
input {
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 1rem;
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
  margin-top: 2rem;
}

.characterForm {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
