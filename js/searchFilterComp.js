Vue.component('search-filter', {
  data() {
    return {
      searchGoods: this.$parent.goods,
      searchResult: [],
      inputText: '',
    }
  },

  methods: {
    search() {
      const regExp = new RegExp(this.inputText, 'i');
      this.searchResult = this.searchGoods.filter(el =>
        regExp.test(el.product_name) || regExp.test(el.price));

      this.$parent.goods = this.searchResult;
    },
  },

  template: `
    <form action="#" class="header__search-form" @submit.prevent="search" @input="search">
          <input type="search" class="header__search-input" v-model="inputText">
          <button class="header__search-button" type="submit">
              <img src="../img/loupe.svg" alt="search-icon">
          </button>
    </form>`
});