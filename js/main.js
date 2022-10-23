const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
  },

  methods: {
    fetchGoods(link) {
      return fetch(link)
        .then(result => result.json())
        .catch(error => {
          console.warn(error);
          this.$refs.error.setError(error);
        });
    },
  },
});