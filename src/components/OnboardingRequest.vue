<template>
  <div>
    <div>
      <h1 class="title">Join onboarding?</h1>
      <button class="button is-link" @click="joinOnboarding('yes')">YES</button>
      <button class="button is-link" @click="joinOnboarding('no')">NO</button>
    </div>
    <br>
    <!-- <div v-if="result">
            <h2 class="subtitle">Public key attached to session</h2>
        </div>
    <br/>-->
    <div>
      <div v-if="mymodel.data">
        <pre>{{mymodel.data[0]}}</pre>
        <img v-bind:src="'data:image/jpeg;base64,'+mymodel.image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OnboardingRequest",
  props: ["mymodel"],
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {}
};
</script>

<style scoped>
</style>
