import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import Buefy from "buefy";
import VueQrcodeReader from "vue-qrcode-reader";

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fas",
  defaultContainerElement: "#content"
});

Vue.use(VueQrcodeReader);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
