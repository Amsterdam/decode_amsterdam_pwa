<template>
  <div>
    <security-code v-model="code"></security-code>
    <button class="button is-link" @click="base.checkPin ? base.secondPin(code) : base.firstPin(code)">Accept</button>
  </div>
</template>

<script>
import SecurityCode from "vue-security-code";

export default {
  name: "CreatePin",
  props: ["base"],
  data() {
    return {
      code: null,
    };
  },
  methods: {},
  components: {
    SecurityCode
  },
};
</script>

<style scoped>
</style>