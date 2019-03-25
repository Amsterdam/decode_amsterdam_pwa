<template>
    <div id="disclosure-page">
        <div v-if="stage == 'ANSWER'">
            <answer-question :base="base"></answer-question>
        </div>
        <div v-if="stage == 'SHOW'">
            <show-answer :base="base"></show-answer>
        </div>

        <!-- DEBUG COMPONENTS -->
        <!-- <answer-question :base="debugBase"></answer-question> -->
        <!-- <show-answer :base="debugBase"></show-answer> -->
    </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import {getRequest, denyRequest, acceptRequest} from "../api";
  import {getItem} from "../services/persistent_storage";
  import {parseRequest} from "../services/request_parser";
  import AnswerQuestion from "../components/AnswerQuestion";
  import ShowAnswer from "../components/ShowAnswer";
  import EnterPin from "../components/EnterPin";
  import debugImage from "../assets/portrait_image";

  export default {
    name: "disclosureView",
    data() {
      return {
        request: null,
        prettyRequest: {},
        personalData: null,
        portraitImage: null,
        color: null,
        request_status: null,
        status: null,
        stage: "ANSWER" // ANSWER & SHOW
      };
    },
    computed: {
      ...mapGetters(["disclosureRequest"]),
      base() {
        return this;
      },
      debugBase() {
        return {
          prettyRequest: {identity: "John Doe", type: 'Name', subType: 'is', data: 'Mark'},
          request_status: "VALID", // "VALID, INVALID, DENIED"
          color: "rgb(255, 0, 0)",
          portraitImage: debugImage.image
        }
      }
    },
    components: {
      AnswerQuestion,
      ShowAnswer,
      EnterPin
    },
    methods: {
      ...mapActions(["setDisclosureRequest"]),
      async acceptQuestion() {
        // 1. verify request with local storage
        const requestValid = this.validateRequest();
        if (requestValid) {
          var requestStatus = "VALID";
        } else {
          var requestStatus = "INVALID";
        }
        // 2. send answer
        const response = await acceptRequest(this.request.id, requestStatus);
        console.log(response);
        this.handleResponse(response.response);
      },
      handleResponse(response) {
        this.status = response.status;

        if (response.response == "INVALID") {
          // TODO: error message and return to profile
        }

        this.stage = "SHOW";
        this.request_status = response.data.request_status;

        if (response.data.secret) {
          this.color = response.data.secret;
          this.portraitImage = getItem('personal_photo');
        }

        this.setDisclosureRequest(null);
      },
      async denyQuestion() {
        const response = await denyRequest(this.request.id);
        console.log(response);
        this.handleResponse(response.response);
      },
      validateRequest() {
        this.personalData = getItem("personal_data");
        this.portraitImage = getItem("personal_photo")
        this.personalData = JSON.parse(this.personalData)

        const request = JSON.parse(this.request.request);
        if (request.type === "age") {
          const age = this.getAge(new Date(this.personalData.date_of_birth));
          // const age = this.getAge("2000-12-15");
          const checkAge = parseInt(request.data);
          if (request.subType === "equal" && age === checkAge) {
            return true;
          } else if (request.subType === "equalOrGreater" && age >= checkAge) {
            return true;
          } else if (request.status === "lesser" && age < checkAge) {
            return true;
          } else {
            return false;
          }
        } else if (request.type === "name") {
          const name = this.personalData.name;
          const firstName = name[1];

          // if first name exists of multiple names, extract the first one
          var veryFirstName = "";
          if (firstName.indexOf(" ") != -1) {
            const names = firstName.split(" ");
            veryFirstName = names[0];
          }

          if (request.data === firstName || request.data === veryFirstName) {
            return true;
          }
        } else if (request.type === "sex") {
          const sex = this.personalData.sex;
          if (request.data === "female" && (sex === "F" || sex === "V")) {
            return true;
          } else if (request.data === "male" && sex === "M") {
            return true;
          } else if (request.data === "other") {
            if (sex === "M" || sex === "F" || sex === "V") {
              return false;
            } else {
              return true;
            }
          }

          return false;
        }

        return false;
      },
      getAge(dateOfBirthString) {
        const today = new Date();
        const dateOfBirth = new Date(dateOfBirthString);
        var age = today.getFullYear() - dateOfBirth.getFullYear();
        var m = today.getMonth() - dateOfBirth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
          age--;
        }
        return age;
      },
      return() {
        this.continued = false;
        this.personalData = null;
        this.portraitImage = null;
        this.color = null;
        this.$router.push("/profile")
      }
    },
    async created() {
      const routeQuery = this.$route.query;
      if (routeQuery.id) {
        console.log("param id:", routeQuery);
        const localResponse = await getRequest(routeQuery.id);
        this.setDisclosureRequest(localResponse.response);
      }

      this.stage = "ANSWER";
      this.request = this.disclosureRequest;
      const identity = this.request.description;
      const question = JSON.parse(this.request.request);
      this.prettyRequest = parseRequest(identity, question);
    },
    destroyed() {
      this.denyQuestion();
    }
  };
</script>

<style scoped>

    #disclosure-page {
        display: block;
        margin: 0;
        padding: 0;
        padding-top: 10vh;
        border: 1px solid transparent;
        height: 100vh;
        position: relative;
    }

</style>