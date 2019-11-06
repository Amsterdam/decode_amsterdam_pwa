<template>
  <div id="findthebox-page">
    <div id="findthebox-content">
      <h1>Find the box</h1>
      <h2>Create your digital identity. Get on board.</h2>
      <img src="../assets/findthebox.svg"/>
    </div>
    <div id="findthebox-footer">
        <a class="button-scan-onboarding-code" @click="openQrScanner()"><img src="../assets/qr_scan.svg"/>Scan Onboarding Code</a>
    </div>
  </div>
</template>

<script>
import { getItem } from "../services/persistent_storage";

export default {
  data() {
    return {
     
    };
  },
  beforeCreate() {
    var personal_data = getItem('personal_data');
    if (personal_data != null) {
      this.$router.push("/profile");
    }
  },
  methods: {
      openQrScanner() {
        this.$router.push("/scan");
      },
  }
};

</script>

<style scoped>

#findthebox-page {
  display: block;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  height: 100vh;
  position: relative;
}

#findthebox-content {
  display: block;
  margin-top: 20vh;
}

#findthebox-content h1 {
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
}

#findthebox-content h2 {
  text-align: center;
  font-weight: normal;
  color: #555555;
  font-size: 1em;
}

#findthebox-content img {
  display: block;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  margin-top: 20px;
}

#findthebox-footer {
  display: block;
  position: absolute;
  height: 80px;
  bottom: 0;
  width: 100%;
}

a.button-scan-onboarding-code {
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

a.button-scan-onboarding-code img {
  vertical-align: top;
  margin-right: 20px;
}

</style>
