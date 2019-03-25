<template>
  <div>
    <h1 class="title">Login</h1>
    <div>
      <div class="field">
        <label class="label">Naam</label>
        <div class="control">
          <input class="input" type="text" placeholder="Je naam" v-model="mymodel.inputUsername">
        </div>
      </div>
      <div class="field">
        <label class="label">Pincode</label>
        <div class="control">
          <input
            class="input"
            type="password"
            maxlength="4"
            placeholder="Pincode"
            pattern="[0-9]{4}"
            v-model="mymodel.pincode"
          >
        </div>
      </div>
      <p>
        <button
          class="button is-link"
          @click="mymodel.login()"
          :disabled="!(mymodel.inputUsername && mymodel.pincode.length === 4)"
        >Log in</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mymodel"],
  name: "Login",
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