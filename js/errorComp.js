Vue.component('error', {
  data() {
    return {
      textError: '',
    }
  },

  methods: {
    setError(error) {
      this.textError = error;
    }
  },

  template: `
    <div class="error" v-if="textError">
      <p class="error_msg">
        <button class="error_close" @click="setError()">&times;</button>
          {{ textError }}
      </p>
    </div>
    `
});
