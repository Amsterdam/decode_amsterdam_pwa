<template>
  <div id="show-answer-content">
    <h1>{{base.prettyRequest.identity}} asked</h1>
    <h2><span id="question-attribute">{{base.prettyRequest.type}}</span><span id="question-logic">{{base.prettyRequest.subType}}</span> <span id="question-value">{{base.prettyRequest.data}}</span></h2>
    <br>

    <div v-if="base.request_status == 'VALID'" class="answer-proven-card">
      <img id="picture" v-bind:src="'data:image/jpeg;base64,'+base.portraitImage" :style="{'border-color': base.color}">
      <div id="disclosure-proven-circle"><img src="../assets/verified_checkmark.svg"/></div>
    </div>
    
    <div v-if="base.request_status == 'INVALID'" class="answer-disproven-card" :style="{'border-color': base.color}">
      <div id="disclosure-disproven-circle"><img src="../assets/verified_disproven.svg"/></div>
      <p>It's not true!</p>
    </div>

    <div v-if="base.request_status == 'DENIED'" class="answer-denied-card" :style="{'border-color': base.color}">
      <div id="disclosure-denied-circle"><img src="../assets/verified_denied.svg"/></div>
      <p>You denied!</p>
    </div>
    
    <div id="show-answer-footer">
        <a class="button-go-back" @click="backToProfile">Go back</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowAnswer",
  props: ["base"],
  methods: {
     backToProfile() {
      this.$router.push("/profile")
    },
  }
};
</script>

<style>

#show-answer-content {
  text-align: center;
  margin-top: 5vh;
}

h1 { 
  font-size: 1.2em;
  font-weight: bold;
}

h2 { 
  font-size: 1.2em;
  font-weight: bold;
}

h3 { 
  font-size: 1.0em;
  font-weight: normal;
}

h2 span {
  margin-right: 10px;
}

p {
  margin-top: 20px;
}

.answer-proven-card {
  position: relative;
  display: block;
  height: 45vh;
}

.answer-proven-card #picture {
  display: block;
  height: 100%;
  width: auto;
  border: 8px solid black;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}

#disclosure-proven-circle {
  position: absolute;
  left: 50%;
  bottom: -50px;
  padding: 10px;
  border: 0;
  width: 100px;
  height: 100px;
  margin-left: -50px; /* hack to make central */
  border-radius: 100px;
  background: green;
}

#disclosure-proven-circle img {
  display: block;
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}

#show-answer-footer {
  display: block;
  position: absolute;
  height: 80px;
  bottom: 0;
  width: 100%;
}

a.button-go-back {
  display: block;
  background: #6310bc;
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

#answer-disproven-card {
  border: 1px solid black;
}

#disclosure-disproven-circle {
  border: 0;
  width: 150px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100px;
  background: red;
  border: 8px solid black;
}

#disclosure-disproven-circle img {
  display: block;
  line-height: 80%;
  width: 75%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  padding-top: 12.5%;
}

#answer-denied-card {
  border: 1px solid black;
}

#disclosure-denied-circle {
  border: 0;
  width: 150px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100px;
  background: red;
  border: 8px solid black;
}

#disclosure-denied-circle img {
  display: block;
  line-height: 80%;
  width: 75%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  padding-top: 12.5%;
}

#show-answer-footer {
  display: block;
  position: absolute;
  height: 80px;
  bottom: 0;
  width: 100%;
}

a.button-go-back {
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
