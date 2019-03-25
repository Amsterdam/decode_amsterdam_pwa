<template>
  <div id="app" class="container">

    <div id="navbar">
        <div v-if="navPopup" id="popup">
          <div id="navbar-header">
            <a v-if="navPopupBackButton" href="#" class="back-button" @click="backButtonClick"><img src="./assets/arrow_back.svg"></a>
            <h1>{{ pageTitle }}</h1>
          </div>
        </div>
        <div v-else id="main">
          <div id="navbar-header">
            <h1>{{ pageTitle }}</h1>
          </div>
          <div id="tabs">
                <a href="#" id="tab-id" v-bind:class="{ 'tab-id-active' : profileIsActive }" @click="onClickIdTab"></a>
                <a href="#" id="tab-claim" v-bind:class="{ 'tab-claim-active' : claimIsActive }" @click="onClickClaimTab"></a>
          </div>
        </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Decode",
  data() {
    return {
      NAVBAR_CONFIG : {
        profile : { pageTitle: "Personal Identity", navPopup : false, section : "profile" },
        question : { pageTitle: "Question Generator", navPopup : false, section : "claim" },
        findthebox : { pageTitle: "Welcome", navPopup : true, navPopupBackButton: false },
        onboarding : { pageTitle: "Onboarding", navPopup : true, navPopupBackButton: false },
        onboarding_id : { pageTitle: "Onboarding", navPopup : true, navPopupBackButton: false },
        scan : { pageTitle: "Scan QR Code", navPopup : true, navPopupBackButton: true , backButtonLocation: 'profile' },
        disclosure : { pageTitle: "Disclosure", navPopup : true, navPopupBackButton: true , backButtonLocation: 'profile'},
        disclosure_id : { pageTitle: "Disclosure", navPopup : true, navPopupBackButton: true , backButtonLocation: 'profile'},

        // ALL OTHER ROUTES TODO
      },
      pageTitle: "Personal Identity",
      navPopup : false,  // true of false ( = main )
      navPopupBackButton: true, // popup has backbutton
    };
  },
  computed : {
    profileIsActive : function()
    {
      let curNavConfig = this.NAVBAR_CONFIG[ this.$route.name ];

      if (curNavConfig){
        if (this.NAVBAR_CONFIG[ this.$route.name ].section == "profile"){
          return true;}
      }
      return false
    },
    
    claimIsActive : function()
    {
      let curNavConfig = this.NAVBAR_CONFIG[ this.$route.name ];

      if (curNavConfig){
        if (this.NAVBAR_CONFIG[ this.$route.name ].section == "claim"){
          return true;
        }
      }
      return false
    },    

  },
  components: {},
  
  methods: {
    onClickIdTab : function(e){
      e.preventDefault();
      this.$router.push({ path: "profile", query: { } });
    },

    onClickClaimTab : function(e)
    {
      e.preventDefault();
      this.$router.push({ path: "question", query: { } });
    },

    backButtonClick : function(e)
    {
      let curNavConfig = this.NAVBAR_CONFIG[this.$route.name];

      if (curNavConfig) {
        let location = this.NAVBAR_CONFIG[this.$route.name].backButtonLocation;
        this.$router.push("/" + location);
      }
    }
  },
  
  watch: {
    $route() {
      // console.log(this.$route);
      // make sure the navbar is in the right state
      let curNavBarConfig = this.NAVBAR_CONFIG[ this.$route.name ];

      if (curNavBarConfig == null){
        console.log("No NAVBAR_CONFIG for route:" + this.$route.name );
        return false;
      }

      this.pageTitle = curNavBarConfig.pageTitle;
      this.navPopup = curNavBarConfig.navPopup;
      this.navPopupBackButton = curNavBarConfig.navPopupBackButton;
    }
  },

  mounted() {
    // const sessionId = this.$route.query.session;
    // if (sessionId) {
    //   // this.$router.push('/readQR');
    //   this.$router.push({ path: "readQR", query: { session: sessionId } });
    // }
  }
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$primary: #8c67ef;
$primary-invert: findColorInvert($primary);

$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

@import "~bulma";
@import "~buefy/src/scss/buefy";

@font-face {
    font-family: AvenirNextMedium;
    src: url("./assets/AvenirNextLTPro-Medium.woff") format("woff");
}

@font-face {
    font-family: AvenirNext;
    src: url("./assets/AvenirNextLTPro-Regular.woff") format("woff");
}

body {
  margin: 0;
  padding: 0;
  background: #f9fafc;
  font-family: 'AvenirNext', 'arial', 'sans-serif';
}

#app {
    display: block;
    width: 100%;
    height: 100vh;
    overflow: auto;
    background: #f9fafc;
}

/* main navbar */

#navbar {
  position: absolute;
  background:#f9fafc;
  text-align: center;
  padding: 0;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  background: #ffffff;
}

#navbar-header {
  display: block;
  height: 7vh;
}

#navbar #main {
  display: block;
  border-bottom: 2px solid #bdbdbd;
}

#navbar #popup {
  display: block;
}

#navbar h1 { 
  font-family: 'AvenirNextMedium', 'arial', 'sans-serif';
  font-size: 1.1em;
  font-weight: normal;
  color: #494949;
  padding: 0;
  margin: 0;
  line-height: 7vh;
}

a.back-button {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  padding: 10px;
}

a.back-button img {
  display: block;
  height: 25px;
  width: auto;
}

div#tabs {
  display: block;
  height: 7vh;
  width: 100%;
  position: relative;
}

div#tabs a {
  display: block;
  width: 50%;
  height: 100%;
  border-bottom: 3px solid transparent;
}

div#tabs a img {
  display: block;
  height: 60%;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1vh;
}

div#tabs a#tab-id {
    position: absolute;
    left: 0;
    top: 0;
    background: url('./assets/id_unselected.svg') no-repeat center center;
}

div#tabs a#tab-claim {
    position: absolute;
    right: 0;
    top: 0;
    background: url("./assets/question_unselected.svg") no-repeat center center;
}

.tab-id-active {
    border-bottom: 2px solid #f5a523 !important;
    background-image: url('./assets/id_selected.svg') !important;
}

.tab-claim-active {
    border-bottom: 2px solid #f5a523 !important;
    background-image: url('./assets/question_selected.svg') !important;
}


</style>
