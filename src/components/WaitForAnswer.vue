<template>
  <div id="wait-for-answer-page">
    <h1>Waiting for answer...</h1>
    
    <p>{{base.request.identity}} asks</p>
    <p>{{base.request.type}} {{base.request.subType}} {{base.request.data}}</p>
    
    <div id="wait-for-answer-footer">
      <a class="wait-for-answer-cancel-button" @click="base.cancel()">Cancel</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaitForAnswer",
  props: ["base"]
};
</script>

<style scoped>

#wait-for-answer-page {
  display: block;
  margin: 0;
  padding: 0;
  padding-top: 20vh;
  border: 1px solid transparent;
  height: 100vh;
  position: relative;
  text-align: center;
}

h1 { 
  font-size: 1.2em;
  font-weight: bold;
}

#wait-for-answer-footer {
  display: block;
  position: absolute;
  height: 80px;
  bottom: 0;
  width: 100%;
}

a.wait-for-answer-cancel-button {
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
