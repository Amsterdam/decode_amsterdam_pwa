<template>
  <div id="show-qr-page">
    <h1>{{base.request.identity}} asks:</h1>
    <h2><span id="question-attribute">{{base.request.type}}</span><span id="question-logic">{{base.request.subType}}</span> <span id="question-value">{{base.request.data}}</span></h2>

    <!-- <p>{{base.request.identity}} asks</p>
    <p>{{base.request.type}} {{base.request.subType}} {{base.request.data}}</p>
    <br> -->
    
    <qrcode-vue :value="base.url" :size="size" level="H"></qrcode-vue>
    
    <div id="show-qr-footer">
    <a class="show-qr-cancel-button" @click="base.cancel()">Cancel</a>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  data() {
    return {
      size: 200
    };
  },
  name: "ShowQR",
  props: ["base"],
  components: {
    QrcodeVue
  }
};
</script>

<style scoped>

#show-qr-page {
  display: block;
  margin: 0;
  padding: 0;
  padding-top: 20vh;
  border: 1px solid transparent;
  height: 100vh;
  position: relative;
  text-align: center;
}

h1 { 
  font-size: 1.2em;
  font-weight: bold;
}

h2 { 
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 40px; /* Hacky: push out canvas QR element */
}

h3 { 
  font-size: 1.0em;
  font-weight: normal;
}

h2 span {
  margin-right: 10px;
}

#show-qr-footer {
  display: block;
  position: absolute;
  height: 80px;
  bottom: 0;
  width: 100%;
}

a.show-qr-cancel-button {
  display: block;
  background: #c60039;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  border-radius: 6vh;
  height: 7vh;
  color: white;
  text-align: center;
  padding-top: 1.5vh;
}


</style>