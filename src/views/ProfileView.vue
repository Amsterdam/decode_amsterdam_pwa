<template>
<div id="profile-page">
  <div id="profile-view-content">
    <profile :base="base"></profile>
    <div id="verified-by"><img src="../assets/verified_by_amsterdam.svg"/></div>
  </div>
  <div id="profile-footer">
        <a class="button-verify-identity" @click="openQrScanner()"><img src="../assets/qr_scan.svg"/>Verify identity</a>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getItem } from "../services/persistent_storage";
import Profile from "../components/Profile";

export default {
  data() {
    return {
      gotData: false,
      picture: null,
      surname: null,
      firstname: null,
      dateOfBirth: null,
      sex: null,
      nationality: null,
      bsn: null,
      personalData: null,
      portraitImage: null
    };
  },
  computed: {
    base() {
      return this;
    }
  },
  components: {
    Profile
  },
  methods: {
    openQrScanner() {
      this.$router.push("/scan")
    },
    setDataStrings(personalData, portraitImage) {
      this.surname = this.personalData.name[0];
      this.firstname = this.personalData.name[1];
      this.dateOfBirth = this.personalData.date_of_birth;

      this.sex = this.personalData.sex;
      this.nationality = this.personalData.nationality;
      this.bsn = this.personalData.optional_data;

      this.picture = this.portraitImage;
    },
    checkForData() {
      this.personalData = getItem('personal_data');
      this.portraitImage = getItem('personal_photo');

      if (this.personalData != null && this.portraitImage != null) {
        this.gotData = true;
        this.personalData = JSON.parse(this.personalData);
        this.setDataStrings(this.personalData, this.portraitImage)
      } else {
        this.$router.push("/");
      }
    }
  },
  // mounted() {
  //   this.checkForData();
  // },
  created() {
    this.checkForData();
  }
};
</script>

<style scoped>

#profile-page {
  display: block;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  height: 100vh;
  position: relative;
}

#profile-view-content {
  display: block;
  margin: 0;
  padding: 0;
  margin-top: 20vh; /* height of navbar */
}

#verified-by {
  padding-bottom: 20px;
}

#verified-by img {
  display: block;
  height: 10vh;
  width: auto;
  margin-left: auto;
  margin-right: auto;
}

#profile-footer {
  display: block;
  position: absolute;
  height: 80px;
  bottom: 0;
  width: 100%;
}

a.button-verify-identity {
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

a.button-verify-identity img {
  vertical-align: top;
  margin-right: 20px;
}



</style>
