const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const goodsList = new Vue({
  el: '#goods_list',
  data: {
    goods: [],
    basket: [],
    sum: 0,
  },

  methods: {
    fetchGoods(link) {
      return fetch(link)
        .then(result => result.json())
        .catch(error => {
          console.error(error);
        });
    },

    sumTotal(arr) {
      let sum = 0;
      arr.forEach(el => sum += el.price);
      return sum;
    },

    addToBasket(event) {
      const findEl = this.basket.find(good => event.id_product === good.id_product);
      if (findEl) {
        findEl.quantity++;
      } else {
        this.$set(event, 'quantity', 1);
        this.basket.unshift(event);
      }
    }
  },

  mounted() {
    this.fetchGoods(`./js/getProducts.json`)
      .then(data => {
        data.forEach(element => {
          if (!element.img) {
            this.$set(element, 'img', './img/150x100.png');
          }
          this.goods.unshift(element);
        });
      });


    this.fetchGoods(`${API}/catalogData.json`)
      .then(data => {
        data.forEach(element => {
          if (!element.img) {
            this.$set(element, 'img', './img/150x100.png');
          }
          this.goods.unshift(element);
        });
      });
  }
});

const headerContent = new Vue({
  el: '#headerContent',
  data: {
    goods: goodsList.goods,
    basket: goodsList.basket,
    inputText: "",
    show: false,
  },

  methods: {
    search() {
      const regExp = new RegExp(`${this.inputText}`, 'ig');
      const searchResult = this.goods.filter(el =>
        regExp.test(el.product_name) || regExp.test(el.price));

      goodsList.goods = searchResult;
    },

    addToBasket(event) {
      const findEl = this.basket.find(good => event.id_product === good.id_product);
      if (findEl) {
        findEl.quantity++;
      } else {
        this.$set(event, 'quantity', 1);
        this.basket.unshift(event);
      }
    },

    removeFromBasket(event) {
      const findEl = this.basket.find(good => event.id_product === good.id_product);
      if (findEl.quantity > 1) {
        findEl.quantity--;
      } else {
        this.basket.splice(findEl, 1);
      }
    },

    sumTotal(arr) {
      let sum = 0;
      arr.forEach(el => sum += el.price * el.quantity);
      return sum;
    },
  }
});