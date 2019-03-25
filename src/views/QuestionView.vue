<template>
    <div>
        <div v-if="stage === 'QUESTION'">
            <create-question :base="base"/>
        </div>
        <div v-if="stage === 'QRCODE'">
            <show-q-r :base="base"/>
        </div>
        <div v-if="stage === 'WAITING'">
            <wait-for-answer :base="base"/>
        </div>
        <div v-if="stage === 'ANSWER'">
            <view-answer :base="base"/>
        </div>

        <!-- DEBUG COMPONENTS -->
        <!-- <show-q-r :base=debugBase></show-q-r> -->
        <!-- <wait-for-answer :base="debugBase"></wait-for-answer> -->
         <!--<view-answer :base="debugBase"></view-answer>-->
    </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import {createQuestion, getRequest, getSessionStatus} from "../api";
  import {getItem} from "../services/persistent_storage";
  import {parseRequest} from "../services/request_parser";
  import {setInterval, clearInterval} from 'timers';
  import CreateQuestion from "../components/CreateQuestion";
  import ShowQR from "../components/ShowQR";
  import WaitForAnswer from "../components/WaitForAnswer";
  import ViewAnswer from "../components/ViewAnswer";


  export default {
    data() {
      return {
        identity: "",
        question: {},
        request: {},
        description: "",
        selectedQuestion: "name",
        selectedAgeRange: "equalOrGreater",
        selectedSex: "female",
        ageInput: 18,
        dobDay: 1,
        dobMonth: 1,
        dobYear: 2000,
        firstName: "",
        surname: "",
        status: "",
        request_status: "",
        color: "",
        sessionId: "",
        url: "",
        statusInterval: null,
        stage: "" // QUESTION, QRCODE, WAITING or ANSWER
      };
    },
    computed: {
      base() {
        return this;
      },
      debugBase() {
        return {
          request: {identity: "John Doe", type: 'Name', subType: 'is', data: 'Mark'},
          sessionId: "xxxxx-xxxxx-xxxxx-xxxxx-xxxxx",
          request_status: "VALID" // "VALID, INVALID, DENIED"
        }
      }
    },
    components: {
      CreateQuestion,
      ShowQR,
      ViewAnswer,
      WaitForAnswer
    },
    methods: {
      create() {
        if (this.identity === "") {
          this.identity = "Anonymous";
        }

        if (this.selectedQuestion === 'age') {
          this.question = {type: this.selectedQuestion, subType: this.selectedAgeRange, data: this.ageInput};
        } else if (this.selectedQuestion === 'dateOfBirth') {
          const date = this.dobYear + "-" + this.dobMonth + "-" + this.dobDay;
          this.question = {type: this.selectedQuestion, data: date};
        } else if (this.selectedQuestion === 'name') {
          // this.question = {type: this.selectedQuestion, data: {firstName: this.firstName, surname: this.surname}};
          this.question = {type: this.selectedQuestion, data: this.firstName};
        } else if (this.selectedQuestion === 'sex') {
          this.question = {type: this.selectedQuestion, data: this.selectedSex};
        }

        if (this.question.data === "") {
          return;
        }

        this.request = parseRequest(this.identity, this.question);
        this.sendQuestion(this.identity, this.question);
      },
      async sendQuestion(description, question) {
        const response = await createQuestion(description, JSON.stringify(question));
        this.sessionId = response.session_id;

        this.url = process.env.VUE_APP_BASE + "disclosure?id=" + this.sessionId;
        console.log("url:", this.url);

        this.stage = "QRCODE";
        this.listenToStatus();
      },
      listenToStatus() {
        this.statusInterval = setInterval(async () => {
          var response = await getSessionStatus(this.sessionId);
          this.status = response.response;
          // console.log(this.status);
          if (this.status === "STARTED") {
            this.stage = "WAITING";
          }
          if (this.status === "FINALIZED") {
            clearInterval(this.statusInterval);
            this.stage = "ANSWER";
            this.getAnswer();
          }
        }, 1000);
      },
      async getAnswer() {
        var response = await getRequest(this.sessionId);
        this.request_status = response.response.data.request_status;

        if (response.response.data.secret) {
          this.color = response.response.data.secret;
        }
      },
      cancel() {
        clearInterval(this.statusInterval);
        this.stage = "QUESTION";
        this.sessionId = null;
        this.question = null;
        this.description = null;
        this.status = null;
        this.valid = null;
        this.color = null;
      }
    },
    created() {
      this.stage = "QUESTION";
      var personalData = getItem("personal_data");

      if (personalData != null) {
        personalData = JSON.parse(personalData);
        const firstname = personalData.name[1];
        this.identity = firstname;
      }
    },
    destroyed() {
      clearInterval(this.statusInterval);
    }
  };
</script>
