Vue.component('basket-list', {
  data() {
    return {
      basketElUrl: '/getBasket.json',
      imgReplace: './img/150x100.png',
      basketList: [],
      show: false,
    }
  },

  methods: {
    addToBasket(event) {
      this.$parent.fetchGoods(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            const findEl = this.basketList.find(good => event.id_product === good.id_product);
            if (findEl) {
              findEl.quantity++;
            } else {
              const eventEl = Object.assign({ quantity: 1 }, event);
              this.basketList.unshift(eventEl);
              //this.$set(event, 'quantity', 1); // Баг - меняется общая стоимость в каталоге
            }
          } else {
            alert('Добавление товара в корзину не разрешено!');
          }
        })
    },

    removeFromBasket(event) {
      this.$parent.fetchGoods(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            const findEl = this.basketList.find(good => event.id_product === good.id_product);
            if (findEl.quantity > 1) {
              findEl.quantity--;
            } else {
              this.basketList.splice(findEl, 1);
            }
          } else {
            alert('Недостаточно прав на удаление товара из корзины');
          }
        })
    },

    sumTotal(arr) {
      let sum = 0;
      arr.forEach(el => {
        el.quantity
          ? sum += el.price * el.quantity
          : sum += el.price;
      });
      return sum;
    },
  },

  mounted() {
    this.$parent.fetchGoods(`${API}` + this.basketElUrl)
      .then(data => {
        data.contents?.forEach(element => {
          if (!element.img) {
            this.$set(element, 'img', this.imgReplace);
          }
          this.basketList.unshift(element);
        });
        console.log(this.basketList);
      });
  },

  template: `
    <div>
      <button @click="show = !show" class="btn-cart" type="button">Корзина</button>
      <div v-show="show" class="basketContent">
        <basket-item 
          v-for="item of basketList"
          :item="item">
        </basket-item>
        <p v-if="!basketList.length">Корзина пуста</p>
        <div v-if="basketList.length" class="total-sum">
          <span style="font-weight: large">Итого: </span>
          <span class="total-sum_result">{{ sumTotal(basketList) }} &#8381;</span>
        </div>
      </div>
    </div>
    `
});

Vue.component('basket-item', {
  props: [
    'item',
  ],

  template: `
    <div class="goodItemBasket" :data-productId="item.id_product">
      <img :src="item.img" :alt="item.product_name">
      <div class="goodItemContent">
        <h3>{{ item.product_name }}</h3>
        <p class="price"><span>{{ item.quantity * item.price }}  &#8381;</span></p>
        <button @click="$parent.removeFromBasket(item)" class="del-btn good-minus">-</button>
        <span class="quantity">{{ item.quantity }}</span>
        <button @click="$parent.addToBasket(item)" class="buy-btn good-plus">+</button>
      </div>
    </div>
    `
});