<template>
  <div>
    <section class="section" v-if="request.response === 'STARTED'">
      <div class="container">
        <!-- <wait-for-answer :mymodel="mymodel"></wait-for-answer> -->
        <view-answer :mymodel=mymodel></view-answer>
      </div>
    </section>

    <section class="section" v-else-if="request.response === 'FINALIZED'">
      <div class="container">
        <show-response :mymodel="mymodel"></show-response>
      </div>
    </section>

    <section class="section" v-else>
      <div class="container">
        <scan-question :mymodel="mymodel"></scan-question>
      </div>
    </section>

    <div v-if="debug">
      <pre>{{session}}</pre>
      <pre>{{request}}</pre>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

// import Answer from "../components/Answer";

import { mapActions, mapGetters } from "vuex";
import { getSession, getSessionStatus, getFullSession } from "../api";
import ScanQuestion from "../components/ScanQuestion";
import ShowResponse from "../components/ShowResponse";
// import WaitForAnswer from "../components/waitForAnswer";
import ViewAnswer from "../components/ViewAnswer"

var status_requestor = null;

export default {
  data() {
    return {
      size: 300,
      session: {},
      request: {},
      attribute: "ouderdan18",
      description: "Ben je 18 jaar of ouder?",
      url:
        window.location["origin"] === "http://localhost:8080"
          ? window.location["origin"] + "?session="
          : window.location["origin"] + "/decode" + "?session="
    };
  },
  computed: {
    ...mapGetters(["debug"]),
    mymodel() {
      return this;
    }
  },
  components: {
    WaitForAnswer,
    ShowResponse,
    ScanQuestion,
    QrcodeVue,
    // answer: Answer,
    ViewAnswer
  },
  methods: {
    ...mapActions({
      setSession: "setSession"
    }),
    endRequest() {
      this.$router.push("/");
    },
    async getSession() {
      this.session = await getSession(this.attribute, this.description);
      this.setSession(this.session);

      status_requestor = setInterval(async () => {
        this.request = await getSessionStatus(this.session.session_id);
        if (this.request.response === "FINALIZED") {
          clearInterval(status_requestor);
          this.session = await getFullSession(this.session.session_id);
          this.setSession(this.session);
        }
      }, 1000);
    }
  },
  mounted() {
    this.getSession();
  },
  destroyed() {
    if (status_requestor) {
      clearInterval(status_requestor);
    }
  }
};
</script>
