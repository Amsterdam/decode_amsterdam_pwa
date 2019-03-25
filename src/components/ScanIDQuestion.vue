<template>
  <div>
    <h1 class="title">Scan QR Code</h1>
    <div>
      <h2 class="subtitle">Scan de QR code om de identiteitsvraag te lezen</h2>

      <!-- <div class="card">
            <div class="card-content">
            <div class="content">
                Tijdelijk kan QR code alleen worden gescant met je eigen camera functie of overige QR code scanner.
            </div>
            <div class="content">
                Groetjes, <br/> De developers
            </div>

            </div>
      </div>-->
      <div>
        <qrcode-reader @decode="mymodel.onDecode"></qrcode-reader>
        <!-- <br/> -->
      </div>
    </div>
    <div class="field">
      <label class="label">Session ID manual input</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Session code"
          v-model="mymodel.inputSession"
          @change="mymodel.onInputSession"
        >
      </div>
      <p>
        <button
          class="button is-link"
          @click="mymodel.getRequest(sessionId)"
          :disabled="!mymodel.inputSession"
        >Get Request</button>
      </p>
    </div>
  </div>
</template>

<script>
import { QrcodeReader } from "vue-qrcode-reader";

export default {
  name: "ScanIDQuestion",
  props: ["mymodel"],
  components: {
    QrcodeReader
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
