<template>
  <div class="home">
    <HelloWorld msg="Initiative Tracker" />
  </div>
</template>

<script>
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    HelloWorld,
  },
});
</script>
