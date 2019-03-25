<template>
  <div id="onboarding-page">
    <div id="onboading-content">
      <h1>Building data profile</h1>
      <h2>Please wait...</h2>
      <img src="../assets/verification.svg"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getRequest, attachPublicKey, getSessionStatus } from "../api";
import { setItem } from "../services/persistent_storage";
import sha512 from "js-sha512";
import _keygen from "raw-loader!../zenroom/keygen.lua";
import _decrypt from "raw-loader!../zenroom/decrypt_message.lua";
import CreatePin from "../components/CreatePin.vue";
import { setInterval, clearInterval } from 'timers';

export default {
  data() {
    return {
      request: null,
      firstHash: null,
      checkPin: false,
      keypair: null,
      result: null,
      loop: null,
      status: null,
      statusInterval: null
    };
  },
  computed: {
    ...mapGetters(["onboardingRequest"]),
    base() {
      return this;
    }
  },
  components: {
    CreatePin
  },
  methods: {
    ...mapActions({
      setOnboardingRequest: "setOnboardingRequest",
    }),
    firstPin(/*code*/) {
      // this.startOnboarding();

      // this.firstHash = sha512.update(code);
      // console.log(this.firstHash.hex())
      // this.checkPin = true;
    },
    secondPin(code) {
      const secondHash = sha512.update(code);
      console.log(secondHash.hex());
      if (this.firstHash !== secondHash) {
        this.firstHash = null;
        console.log("Retry");
        // TODO: give notification to retry
      }
      console.log("Accepted");
    },
    startOnboarding() {
      this.zenroom("keypair");
      const publicKey = JSON.parse(this.keypair).public;
      attachPublicKey(publicKey, this.request.id).then(() => this.listenToStatus());
    },
    async handleEncrypedData() {
      this.session = await getRequest(this.request.id);
      this.encryptedData = this.session.response.data.encrypted;
      this.zenroom("decrypt");
    },
    handleDecrypted(value) {
      const decrypted = JSON.parse(value);
      const decryptedData = JSON.parse(decrypted.data);
      const personal_data = decryptedData[0].personal_data;
      const portrait_image = decryptedData[1].image_base64;

      setItem("personal_data", JSON.stringify(personal_data));
      setItem("personal_photo", portrait_image);

      this.$router.push("/profile");
    },
    listenToStatus() {
      this.statusInterval = setInterval(async () => {
        const response = await getSessionStatus(this.request.id);
        this.status = response.response;
        console.log(this.status);
        if (this.status === "GOT_ENCR_DATA") {
          this.handleEncrypedData();
          clearInterval(this.statusInterval);
        }
      }, 1000);
    },
    zenroom(method) {
      window.Module['onRuntimeInitialized'] = function() {
        console.log("onRuntimeInitialized!");
      };

      window.Module = {
        ...window.Module,
        exec_ok: () => (this.result += " OK"),
        exec_error: () => (this.result += " ERROR"),
        onRuntimeInitialized: () => (console.log("onRuntimeInitialized call"))
      };

      const keypair = () => {
        window.Module.print = text => (this.keypair = text);

        const keys = null;
        const data = null;
        const conf = null;
        const script = _keygen;

        window.Module.ccall(
            "zenroom_exec",
            "number",
            ["string", "string", "string", "string", "number"],
            [script, conf, keys, data, 1]
        );
      };

      const decrypt = () => {
        window.Module.print = text => this.handleDecrypted(text);

        const keys = this.keypair;
        const data = this.encryptedData;
        const conf = null;
        const script = _decrypt;

        window.Module.ccall(
          "zenroom_exec",
          "number",
          ["string", "string", "string", "string", "number"],
          [script, conf, keys, data, 1]
        );
      };

      if (method === "keypair") {
        keypair();
      } else if (method === "decrypt") {
        decrypt();
      }
    }
  },
  mounted() {
    const routeQuery = this.$route.query;

    if (routeQuery.id) {
      console.log("query:", routeQuery);
      // const localResponse = await getRequest(routeQuery.id);
      // this.setOnboardingRequest(localResponse.response);
      // this.$router.push('/onboarding');

      getRequest(routeQuery.id)
        .then(r => {
          this.request = r.response;
          this.startOnboarding();
        });
    }
    else if (this.onboardingRequest) {
      this.request = this.onboardingRequest;
      this.startOnboarding();
    }
  },
  destroyed() {
    clearInterval(this.statusInterval);
  }
};
</script>

<style scoped>

#onboarding-page {
  display: block;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  height: 100vh;
  position: relative;
}

#onboading-content {
  display: block;
  margin-top: 20vh;
}

#onboading-content h1 {
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
}

#onboading-content h2 {
  text-align: center;
  font-weight: normal;
  color: #555555;
  font-size: 1em;
}

#onboading-content img {
  display: block;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: auto;
}

</style>
