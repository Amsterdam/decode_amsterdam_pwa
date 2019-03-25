<template>
  <div id="create-creation-page">
    <div id="create-question-content">
      <div id="create-question-card">
        <img src="../assets/question_generator.svg"/>
        <div class="section">
          <h1>Define your identity</h1>
          <input class="input" type="text" placeholder="Your identity" v-model="base.identity">
        </div>
        <div class="section">
          <h1>Select a question</h1>
          <select v-model="base.selectedQuestion">
            <option value="age">Age</option>
            <!-- <option value="dateOfBirth">Date</option> -->
            <option value="name">Name</option>
            <!-- <option value="nationality">Nationaliteit</option> -->
            <option value="sex">Sex</option>
          </select>
          <!-- Age -->
          <div v-if="base.selectedQuestion == 'age'">
            <h1>Choose a logic</h1>
            <select v-model="base.selectedAgeRange">
              <option value="equalOrGreater">Equal or greater then</option>
              <option value="lesser">Lower then</option>
              <option value="equal">Equal to</option>
            </select>
            <!-- <h1>The age:</h1> -->
            <input class="input" type="number" placeholder="Age" v-model="base.ageInput">
          </div>
          <!-- Date of birth -->
          <div v-if="base.selectedQuestion == 'dateOfBirth'">
            <input v-model="base.dobDay" class="input" type="number" placeholder="Dag">
            <input v-model="base.dobMonth" class="input" type="number" placeholder="Maand">
            <input v-model="base.dobYear" class="input" type="number" placeholder="Jaar">
          </div>
          <!-- Name -->
          <div v-if="base.selectedQuestion == 'name'">
            <input
              class="input"
              type="text"
              placeholder="First name"
              v-model="base.firstName"
            >
            <!-- <input
              class="input"
              type="text"
              placeholder="Achternaam"
              v-model="base.surname"
            > -->
          </div>
          <!-- Sex -->
          <div v-if="base.selectedQuestion == 'sex'">
            <select v-model="base.selectedSex">
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      
      </div><!-- end card -->
    </div><!-- end content-->
    <div id="create-question-footer">
        <a class="button-create-question" @click="base.create()"><img src="../assets/qr_scan.svg"/>Ask Question</a>
    </div>
  </div><!-- end page -->
</template>

<script>
export default {
  name: "CreateQuestion",
  props: ["base"]
};
</script>

<style scoped>

#create-creation-page {
  display: block;
  height: 100vh;
  overflow: hidden;
}

#create-question-content {
  margin-top: 20vh;
}

#create-question-card {
  display: block;
  background: white;
  border-radius: 10px;
  margin: 7vw;
  padding: 7vw;
}

#create-question-card .section {
  margin:0;
  padding: 0;
}

#create-question-card img {
    display: block;
    width: 40%;
    margin: 0;
    margin-left: auto;
    margin-right: auto;
    height: auto;
}

#create-question-card h1 {
  font-size: 1em;
  color: #9f9f9f
}

#create-question-card input {
  display: block;
  border: 0;
  border-radius: 0 !important;
  border-bottom: 3px solid #216193;
  font-size: 0.9em;
  color: #494949;
  margin-bottom: 10px;
}

#create-question-card select {
  display: block;
  border: 0;
  border-radius: 0 !important;
  border-bottom: 3px solid #216193;
  font-size: 0.9em;
  color: #494949;
  width: 100%;
  margin-bottom: 10px;
}

#create-question-footer {
  display: block;
  position: absolute;
  height: 80px;
  bottom: 0;
  width: 100%;
}

a.button-create-question {
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

a.button-create-question img {
  vertical-align: top;
  margin-right: 20px;
}

</style>
