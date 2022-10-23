Vue.component('goods-list', {

  data() {
    return {
      catalogUrl: '/catalogData.json',
      catalogLocal: `./js/getProducts.json`,
      imgReplace: './img/150x100.png',
    }
  },

  mounted() {
    this.$parent.fetchGoods(this.catalogLocal)
      .then(data => {
        data.forEach(element => {
          if (!element.img) {
            this.$set(element, 'img', this.imgReplace);
          }
          this.$parent.goods.unshift(element);
        });
      });


    this.$parent.fetchGoods(`${API}` + this.catalogUrl)
      .then(data => {
        data.forEach(element => {
          if (!element.img) {
            this.$set(element, 'img', this.imgReplace);
          }
          this.$parent.goods.unshift(element);
        });
      });
  },

  template: `
    <div class="goods_info">
      <div class="goods_list">
        <div v-for="item of $parent.goods" class="goods_item" :data-productId="item.id_product">
          <img :src="item.img" :alt="item.product_name">
          <h3>{{ item.product_name }}</h3>
          <p><span>{{ item.price }}</span> &#8381;</p>
          <button @click="$root.$refs.basket.addToBasket(item)" class="buy-btn">Купить</button>
        </div>
      </div>
      <div v-show="$parent.goods.length" class="goods_total-sum">
        <span style="font-weight: bold">Общая стоимость: </span>
        <span>{{ $root.$refs.basket.sumTotal($parent.goods) }} &#8381;</span>
      </div>
    </div>
    `
})