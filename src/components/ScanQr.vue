<template>
  <div>
    <qrcode-reader @decode="base.onDecode"></qrcode-reader>
    <!-- <button class="button is-link" @click="base.return()">Terug</button> TO ScanView --> 
  </div>
</template>

<script>
import { QrcodeReader } from "vue-qrcode-reader";

export default {
  name: "ScanQr",
  props: ["base"],
  components: {
    QrcodeReader
  },
};
</script>

<style scoped>
</style>