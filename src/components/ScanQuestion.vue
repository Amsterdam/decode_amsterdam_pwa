<template>
  <div>
    <h1 class="title">{{mymodel.description}}</h1>
    <h2 class="subtitle">Scan onderstaande code om deze vraag te beantwoorden</h2>
    <div>
      <qrcode-vue :value="mymodel.url + mymodel.session.session_id" :size="mymodel.size" level="H"></qrcode-vue>
      <div>{{mymodel.url}}{{mymodel.session.session_id}}</div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "ScanQuestion",
  props: ["mymodel"],
  components: {
    QrcodeVue
  },
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
