<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          DECODE
          <span v-if="hasLocalStorage">*</span>
        </h1>
        <h2 class="subtitle">Digital Identity by Gemeente Amsterdam</h2>
        <section class="section">
          <div class="container">
            <button class="button is-link" @click="startRequester()">
              Barman
            </button>
            &nbsp;
            <button class="button is-link" @click="startVisitor()">
              Bezoeker
            </button>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import { setItem, getItem, removeItem } from "../services/persistent_storage";

export default {
  name: "home",
  data() {
    return {
      hasLocalStorage: null
    };
  },
  computed: {
    ...mapGetters(["session"])
  },
  components: {},
  methods: {
    startRequester() {
      this.$router.push("/showQR");
    },
    startVisitor() {
      this.$router.push("/readQR");
    }
  },
  mounted() {
    const key = "Local storage";
    setItem(key, "is available");
    this.hasLocalStorage = getItem(key);
    removeItem(key);
  }
};
</script>
