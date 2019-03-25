<template>
  <div>
    <div v-if="mymodel.session.response.data" class="has-text-centered">
      <answer
        :question="mymodel.description"
        :status="mymodel.session.response.data.request_status"
        :valid="mymodel.session.response.data.request_valid"
        :color="mymodel.session.response.data.secret"
      ></answer>
      <br>
      <p>
        <button class="button" @click="mymodel.endRequest()">OK</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowResponse",
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
