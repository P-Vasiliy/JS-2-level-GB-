const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
  constructor(id, title, price, img) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
  }

  render() {
    return `<div class="goods_item" data-productId="${this.id}">
        <img src="${this.img}" 
        onerror="this.src='./img/150x100.png'"
        alt="${this.title}">
        <h3>${this.title}</h3>
        <p>$<span>${this.price}</span></p>
        <button class="buy-btn">Купить</button>
      </div>`;
  }
}

class GoodsList {
  constructor(container) {
    this.goods = [];

    this._fetchGoods()
      .then(data => {
        data.forEach(element =>
          this.goods.unshift(element));

        this._render(container);
        this.sumTotal(container, 'afterend');
      });
  }

  _fetchGoods() {
    this.goods = [
      { id_product: 1, product_name: 'Notebook', price: 2000, img: "./img/goods/notebook.png" },
      { id_product: 2, product_name: 'Mouse', price: 20, img: "./img/goods/mouse.png" },
      { id_product: 3, product_name: 'Keyboard', price: 200, img: "./img/goods/keyboard.jfif" },
      { id_product: 4, product_name: 'Gamepad', price: 50, img: "./img/goods/gamepad.jpg" },
      { id_product: 5, product_name: "Майка", price: 100 },
      { id_product: 6, product_name: "Джинсы", price: 250 },
      { id_product: 7, product_name: "Куртка", price: 500 },
      { id_product: 8, product_name: "Шапка", price: 150 },
    ];
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.error(error);
      });
  }

  _render(whereToInsert) {
    const createGoodItem = this.goods.map(good =>
      new GoodsItem(good.id_product, good.product_name, good.price, good.img).render());

    document
      .querySelector(whereToInsert)
      .insertAdjacentHTML('beforeend', createGoodItem.join(''));
  }

  sumTotal(container, whereToInsert) {
    let sum = 0;
    this.goods.forEach(good => sum += good.price);
    document
      .querySelector(container)
      .insertAdjacentHTML(whereToInsert, `
        <div class="total-sum">
          <span style="font-weight: bold">Общая стоимость: </span>
          $<span>${sum}</span>
        </div>`);
  }
}

const list = new GoodsList('.goods_list');