const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class RenderingBasket {
  constructor(container) {
    this.goodsBasket = [];

    this._clickBasket();
    this._addItemToBasket();
    this._fetchGoodToBasket()
      .then(data => {
        data.contents.forEach(element =>
          this.goodsBasket.unshift(element));
        this._render(container, this.goodsBasket);
        this.sumTotal()
      });
  }

  _fetchGoodToBasket() {
    return fetch(`${API}/getBasket.json`)
      .then(result => result.json())
      .catch(error => {
        console.error(error);
      });
  }

  _clickBasket() {
    document
      .querySelector('.btn-cart')
      .addEventListener('click', event => {
        document.querySelector('.basketContent').classList.toggle('hidden');
      });
  }

  _render(whereToInsert, arr) {
    const createGoodItemBasket = arr.map(good =>
      new GoodItemBasket(good).render());

    document
      .querySelector(whereToInsert)
      .insertAdjacentHTML('afterbegin', createGoodItemBasket.join(''));
  }

  _addItemToBasket() {
    document.body.addEventListener('click', event => {
      if (!event.target.classList.contains('buy-btn')) {
        return;
      } else {
        const elClosest = event.target.closest('.goods_item');
        const goods = [{
          id_product: +elClosest.getAttribute('data-productId'),
          product_name: elClosest.querySelector('h3').innerText,
          img: elClosest.querySelector('img').getAttribute('src'),
          price: +elClosest.querySelector('span').innerText,
          quantity: +1,
        }];

        let goodEl = document
          .querySelector(`.goodItemBasket[data-productId="${goods[0].id_product}"]`);

        if (goodEl) {
          let result = this.goodsBasket
            .find(element => element.id_product === goods[0].id_product);
          result.quantity++;
          result.price += goods[0].price;
          console.log(result);
          result = new GoodItemBasket(result).render();
          goodEl.remove();
          document
            .querySelector('.basketContent')
            .insertAdjacentHTML('afterbegin', result);
          this.sumTotal();
        } else {
          this._render('.basketContent', goods);
          this.sumTotal();
          this.goodsBasket.unshift(goods[0]);
          console.log(this.goodsBasket);
        }
      }
    });
  }

  sumTotal() {
    let sum = 0;
    this.goodsBasket.forEach(good => sum += good.price);

    return document
      .querySelector('.total-sum_result').innerText = sum.toFixed(2);
  }
}

class GoodItemBasket {
  constructor(good) {
    this.id = good.id_product;
    this.title = good.product_name;
    this.price = good.price;
    this.quantity = good.quantity;
    this.img = good.img;

    this.render();
  }

  render() {
    document.querySelector('.empty').classList.add('hidden');
    document.querySelector('.total-sum').classList.remove('hidden');

    return `<div class="goodItemBasket" data-productId="${this.id}">
              <img src="${this.img}"
              onerror="this.src='./img/150x100.png'" alt="${this.title}">
              <div class="goodItemContent">
                <h3>${this.title}</h3>
                <p class="price">$<span>${this.price}</span></p>
                <button class="del-btn good-minus">-</button>
                <span class="quantity">${this.quantity}<span>
                <button class="buy-btn good-plus">+</button>
              </div>
            </div>`;
  }
}

const x = new RenderingBasket('.basketContent');

