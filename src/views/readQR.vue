<template>
  <div>
    <section class="section" v-if="!loggedIn">
      <div class="container">
        <login :mymodel="mymodel"></login>
      </div>
    </section>

    <section class="section" v-else-if="onboardingRequest">
      <div class="container">
        <onboarding-request :mymodel="mymodel"></onboarding-request>
      </div>
    </section>

    <section class="section" v-else-if="disclosureRequest">
      <div class="container">
        <div v-if="!response">
          <answer-question :mymodel="mymodel"></answer-question>
        </div>

        <div v-else-if="response.response.data" class="has-text-centered">
          <show-answer :mymodel="mymodel"></show-answer>
        </div>
      </div>
    </section>

    <section class="section" v-else>
      <div class="container">
        <scan-i-d-question :mymodel="mymodel"></scan-i-d-question>
      </div>
    </section>

    <div v-if="debug">
      <pre>{{sessionId}}</pre>
      <pre>{{request}}</pre>
      <pre>{{response}}</pre>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { QrcodeReader } from "vue-qrcode-reader";
import { socket, joinRoom, sessionStatus } from "../services/sockets";
import { setItem } from "../services/persistent_storage";
import {
  getRequest,
  acceptRequest,
  denyRequest,
  // getPictureUrl,
  attachPublicKey
} from "../api";
// import Answer from "../components/Answer";
// Zenroom
import _keygen from "raw-loader!../zenroom/keygen.lua";
import _decrypt from "raw-loader!../zenroom/decrypt_message.lua";
import Login from "../components/Login";
import OnboardingRequest from "../components/OnboardingRequest";
import AnswerQuestion from "../components/AnswerQuestion";
import ViewAnswer from "../components/ViewAnswer";
import ScanIDQuestion from "../components/ScanIDQuestion";

export default {
  data() {
    return {
      sessionId: null,
      request: null,
      onboardingRequest: null,
      disclosureRequest: null,
      response: null,
      inputSession: "",
      inputUsername: "aj.jansen",
      pincode: "1234",
      pictureUrl: null,
      loggedIn: false,
      result: null,
      keypair: null,
      encryptedData: null,
      decrypted: null,
      session: null,
      data: null,
      image: null
    };
  },
  computed: {
    ...mapGetters(["username", "debug"]),
    mymodel() {
      return this;
    }
  },
  components: {
    ScanIDQuestion,
    ViewAnswer,
    AnswerQuestion,
    OnboardingRequest,
    Login,
    QrcodeReader
    // answer: Answer
  },
  methods: {
    ...mapActions({
      setUsername: "setUsername"
    }),
    onDecode(decodedString) {
      // QR code scan result
      if (decodedString) {
        if (decodedString.includes("http")) {
          let qPos = decodedString.indexOf("?");
          this.sessionId = decodedString.substring(
            qPos + "?session=".length,
            decodedString.length
          );
        } else {
          this.sessionId = decodedString;
        }

        this.getRequest(this.sessionId);
      }
    },
    zenroom(method) {
      window.Module = {
        ...window.Module,
        exec_ok: () => (this.result += " OK"),
        exec_error: () => (this.result += " ERROR")
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
        window.Module.print = text => this.setDecryptedValue(text);

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
    },
    joinOnboarding(answer) {
      if (answer === "yes") {
        this.zenroom("keypair");
        this.result = this.keypair;
        this.sendPublicKey(JSON.parse(this.keypair).public);
      } else {
        // TODO: send end onboarding request
      }
    },
    async sendPublicKey(publicKey) {
      this.response = await attachPublicKey(publicKey, this.sessionId);
      this.result = this.response;
    },
    async handleEncrypedData() {
      this.session = await getRequest(this.sessionId);
      this.encryptedData = this.session.response.data.encrypted;
      this.zenroom("decrypt");
    },
    setDecryptedValue(value) {
      this.decrypted = value;
      var decryptedObj = JSON.parse(this.decrypted);
      this.data = JSON.parse(decryptedObj.data);
      this.image = this.data[1].image_base64;

      setItem("personal_data", this.data[0]);
      setItem("personal_photo", this.image);
    },
    async getRequest(sessionId) {
      this.request = await getRequest(sessionId);
      if (this.request.response.request === "onboarding") {
        this.onboardingRequest = this.request.response;
        joinRoom(this.sessionId);
        this.joinOnboarding();
      } else {
        this.disclosureRequest = this.request.response;
      }
    },
    async acceptQuestion() {
      this.response = await acceptRequest(
        this.disclosureRequest.id,
        this.username
      );
    },
    async denyQuestion() {
      this.response = await denyRequest(this.disclosureRequest.id);
    },
    endQuestion() {
      this.$router.push("/");
    },
    async onInputSession() {
      // Manual session input
      if (this.inputSession.includes("http")) {
        let qPos = this.inputSession.indexOf("?");
        this.sessionId = this.inputSession.substring(
          qPos + "?session=".length,
          this.inputSession.length
        );
      } else {
        this.sessionId = this.inputSession;
      }
      this.result = this.sessionId;
      this.getRequest(this.sessionId);
    },
    async login() {
      // Simple login
      if (this.inputUsername && this.pincode) {
        this.loggedIn = true;
        this.setUsername(this.inputUsername);
        // this.pictureUrl = await getPictureUrl(this.inputUsername);
        // this.pictureUrl = this.pictureUrl.response;
      }
    }
  },
  mounted() {
    this.loggedIn = !!this.username;
    this.sessionId = this.$route.query.session;

    if (this.sessionId) {
      this.getRequest(this.sessionId);
    }

    // const onStatus = data => console.log(data);
    socket.on("status_update", data => {
      // onStatus(data);
      if (data.status == sessionStatus.GOT_ENCR_DATA) {
        this.handleEncrypedData();
      }
    });
    console.log("API URL: " + process.env.VUE_APP_API);
  }
};
</script>
