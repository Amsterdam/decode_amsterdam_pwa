<template>
  <div id="view-answer-page">
    <div v-if="base.request_status == 'VALID'" class="answer-proven-card">
      <div id="disclosure-proven-circle" :style="{'border-color': base.color}"><img src="../assets/verified_checkmark.svg"/></div>
      <h1>{{base.request.type}} {{base.request.subType}} {{base.request.data}}</h1>
    </div>
    <div v-if="base.request_status == 'INVALID'" class="answer-disproven-card">
      <div id="disclosure-disproven-circle" :style="{'border-color': base.color}"><img src="../assets/verified_disproven.svg"></div>
      <h1>{{base.request.type}} {{base.request.subType}} {{base.request.data}}</h1>
      <h2>Not true!</h2>
    </div> 
    <div v-if="base.request_status == 'DENIED'" class="answer-denied-card">
      <div id="disclosure-denied-circle"  :style="{'border-color': base.color}"><img src="../assets/verified_denied.svg"/></div>
      <h1>{{base.request.type}} {{base.request.subType}} {{base.request.data}}</h1>
      <h2>Denied access to this information!</h2>
    </div>
    
    
    <div id="view-answer-footer">
      <a class="view-answer-cancel-button" @click="base.cancel()">Go back</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewAnswer",
  props: ["base"]
};
</script>

<style scoped>

#view-answer-page {
  display: block;
  margin: 0;
  padding: 0;
  padding-top: 30vh;
  border: 1px solid transparent;
  height: 100vh;
  position: relative;
  text-align: center;
}


h1 { 
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 10px;
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

#disclosure-proven-circle {
  border: 0;
  width: 150px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100px;
  background: green;
  border: 8px solid black;
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

#view-answer-footer {
  display: block;
  position: absolute;
  height: 80px;
  bottom: 0;
  width: 100%;
}

a.view-answer-cancel-button {
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
