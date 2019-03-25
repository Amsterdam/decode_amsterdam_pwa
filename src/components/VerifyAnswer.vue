<template>
  <div>
    <answer
      :question="mymodel.request.description"
      :status="mymodel.response.response.data.request_status"
      :valid="mymodel.response.response.data.request_valid"
      :color="mymodel.response.response.data.secret"
      :pictureUrl="mymodel.pictureUrl"
    ></answer>
    <br>
    <p>
      <button class="button" @click="mymodel.endQuestion()">OK</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "VerifyAnswer",
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
