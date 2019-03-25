<template>
  <div id="question-content">
    <h1>{{base.prettyRequest.identity}} asks:</h1>
    <h2><span id="question-attribute">{{base.prettyRequest.type}}</span><span id="question-logic">{{base.prettyRequest.subType}}</span> <span id="question-value">{{base.prettyRequest.data}}</span></h2>
    <h3>Do you want to share this information?</h3>
    <div id="answer-buttons">
      <button class="button-yes" @click="base.acceptQuestion()">Yes</button>
      <button class="button-no" @click="base.denyQuestion()">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswerQuestion",
  props: ["base"]
};
</script>

<style scoped>

#question-content {
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

#answer-buttons {
  margin-top: 40px;
}

.button-yes {
  display: block;
  background: #c60039;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  border: 0;
  border-radius: 6vh;
  height: 7vh;
  color: white;
  text-align: center;
  font-size: 1em;
  font-weight: normal;
}

.button-no {
  display: block;
  border: 2px solid #c60039;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  border-radius: 6vh;
  height: 7vh;
  color: #c60039;
  text-align: center;
  background: white;
}

</style>
