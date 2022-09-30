class GoodsItem {
  constructor(id, title, price, img) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
  }

  render() {
    return `<div class="goods_item">
        <img src="./img/goods/${this.img}" 
        onerror="this.src='./img/150x100.png'"
        alt="${this.title}">
        <h3>${this.title}</h3>
        <p>$<span>${this.price}</span></p>
        <button class="buy-btn">Купить</button>
      </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { id: 1, title: 'Notebook', price: 2000, img: "notebook.png" },
      { id: 2, title: 'Mouse', price: 20, img: "mouse.png" },
      { id: 3, title: 'Keyboard', price: 200, img: "keyboard.jfif" },
      { id: 4, title: 'Gamepad', price: 50, img: "gamepad.jpg" },
      { id: 5, title: "Майка", price: 100 },
      { id: 6, title: "Джинсы", price: 250 },
      { id: 7, title: "Куртка", price: 500 },
      { id: 8, title: "Шапка", price: 150 },
    ];
  }

  render(whereToInsert) {
    const createGoodItem = this.goods.map(good =>
      new GoodsItem(good.id, good.title, good.price, good.img).render());
    document
      .querySelector(whereToInsert)
      .insertAdjacentHTML('beforeend', createGoodItem.join(''));
  }

  sumTotal(whereToInsert) {
    let sum = 0;
    this.goods.forEach(good => sum += good.price);
    document
      .querySelector(whereToInsert)
      .insertAdjacentHTML('afterend', `
        <div class="total-sum">
          <span style="font-weight: bold">Общая стоимость: </span>
          $<span>${sum}</span>
        </div>`);
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render('.goods_list');
list.sumTotal('.goods_list');