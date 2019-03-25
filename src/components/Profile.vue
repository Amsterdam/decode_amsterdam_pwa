<template>
  <div id="profile-card">
    <div class="profile-col-left">
        <img v-bind:src="'data:image/jpeg;base64,'+base.picture">
        <div class="profile-block">
          <h1>Date of birth</h1>
          <h2>{{base.dateOfBirth}}</h2>
        </div>
        <div class="profile-block">
          <h1>Nationality</h1>
          <h2>{{base.nationality}}</h2>
        </div>
    </div>
    
    <div class="profile-col-right">
      <div class="profile-block">
        <h1>Surname</h1>
        <h2>{{base.surname}}</h2>
      </div>
      <div class="profile-block">
        <h1>Firstname(s)</h1>
        <h2>{{base.firstname}}</h2>
      </div>
      <div class="profile-block">
        <h1>Sex</h1>
        <h2>{{base.sex}}</h2>
      </div>
      <div class="profile-block">
          <h1>BSN</h1>
          <h2>{{base.bsn}}</h2>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Profile",
  props: ["base"],
  data() {
    return {};
  }
};
</script>

<style scoped>

#profile-card {
  display: block;
  position: relative;
  margin: 6vw;
  background: white;
  border-radius: 15px;
  padding: 8vw;
  border: 0;
  outline: none;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}

.profile-col-left {
  display: inline-block;
  width: 50%;
  border: 0;
  vertical-align: top;
}

.profile-col-left img {
  display: block;
  width: 90%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 10px;
}

.profile-col-right {
  display: block;
  position: absolute;
  bottom: 8vw; /* hacky */
  right: 8vw;
  width: 30vw;
  border: 0;
}

.profile-block {
  display: block;
  border: 0;
  border-top: 1px solid silver;
}

.profile-block h1 {
  color: #c60039;
}

.profile-block h2 {
  color: black;
}


</style>