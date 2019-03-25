<template>
  <div id="scan-view-page">
      <scan-qr :base="base"></scan-qr>
      <div id="scan-view-footer">
        <a class="button-scan-go-back" @click="base.return()">Go Back</a>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ScanQr from "../components/ScanQr";
import { getRequest } from "../api";

export default {
  data() {
    return {
      sessionId: null,
    };
  },
  computed: {
    base() {
      return this;
    }
  },
  components: {
    ScanQr
  },
  methods: {
    ...mapActions({
      setOnboardingRequest: "setOnboardingRequest",
      setDisclosureRequest: "setDisclosureRequest"
    }),
    return() {
      //this.$router.push("/profile");
      this.$router.go(-1); // more generic
    },
    onDecode(decodedString) {
      if (decodedString) {
        const url = decodedString;
        this.sessionId = url.substring(url.lastIndexOf('=')+1, url.length);
        this.handleSessionId(this.sessionId);
      }
    },
    async handleSessionId(sessionId) {
      const localResponse = await getRequest(sessionId);
      if (localResponse.response.request === "onboarding") {
        this.setOnboardingRequest(localResponse.response);
        this.$router.push("/onboarding");
      } else {
        this.setDisclosureRequest(localResponse.response);
        this.$router.push("/disclosure");
      }
    }
  }
};
</script>

<style scoped>

#scan-view-page {
  display: block;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  height: 100vh;
  position: relative;
}

#scan-view-footer {
  display: block;
  position: absolute;
  height: 80px;
  bottom: 0;
  width: 100%;
}

a.button-scan-go-back {
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

a.button-scan-go-back img {
  vertical-align: top;
  margin-right: 20px;
}


</style>
