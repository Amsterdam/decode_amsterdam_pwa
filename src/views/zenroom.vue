<template>
  <div class="has-text-centered">
    <button class="button" @click="run('encrypt')">Encrypt with PBKDF</button>
    <br>
    <div>Result
      <pre>{{encrypted}}</pre>
    </div>
    <br>

    <!-- <div class="control">
          <input class="input" type="text" placeholder="Encrypted data"
            v-model="inputEncrypted" @change="setEncryptedData">
        </div>
    <br>-->
    <button class="button" @click="run('decrypt')">Decrypt with PBKDF</button>
    <br>
    <div>Result
      <pre>{{decrypted}}</pre>
    </div>
    <br>

    <div>Last result: {{result}}</div>
  </div>
</template>

<script>
import _pbkdf_encrypt from "raw-loader!../zenroom/pbkdf_encrypt.lua";
import _pbkdf_encrypt_keys from "raw-loader!../zenroom/pbkdf_encrypt.keys";
import _pbkdf_decrypt from "raw-loader!../zenroom/pbkdf_decrypt.lua";
import _pbkdf_decrypt_keys from "raw-loader!../zenroom/pbkdf_decrypt.keys";
import { setItem } from "../services/persistent_storage";

export default {
  name: "zenroom",
  data() {
    return {
      result: "",
      encrypted: "",
      decrypted: "",
      inputEncrypted: ""
    };
  },
  methods: {
    async setEncryptedData() {
      this.encrypted = this.inputEncrypted;
    },
    run(method) {
      window.Module = {
        ...window.Module,
        exec_ok: () => (this.result += "ok "),
        exec_error: () => (this.result += "error ")
      };

      const pbkdfEncrypt = () => {
        window.Module.print = text => (this.encrypted = text);

        const keys = _pbkdf_encrypt_keys;
        const data = null;
        const conf = null;
        const script = _pbkdf_encrypt;

        window.Module.ccall(
          "zenroom_exec",
          "number",
          ["string", "string", "string", "string", "number"],
          [script, conf, keys, data, 1]
        );
      };

      const pbkdfDecrypt = () => {
        window.Module.print = text => (this.decrypted = text);

        const keys = _pbkdf_decrypt_keys;
        const data = this.encrypted;
        const conf = null;
        const script = _pbkdf_decrypt;

        window.Module.ccall(
          "zenroom_exec",
          "number",
          ["string", "string", "string", "string", "number"],
          [script, conf, keys, data, 1]
        );
      };

      if (method === "encrypt") {
        pbkdfEncrypt();
      } else if (method === "decrypt") {
        pbkdfDecrypt();
      }
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped>
</style>
