<template>
  <div>ID
    <div v-if="data">
      <pre>{{data[0]}}</pre>
      <img v-bind:src="'data:image/jpeg;base64,'+image">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { data } from "../services/tmpdata";

export default {
  name: "showID",
  data() {
    return {
      data: null,
      image: null
    };
  },
  computed: {},
  components: {},
  methods: {},
  mounted() {
    this.data = JSON.parse(data.data);
    this.image = this.data[1].image_base64;
  }
};
</script>
