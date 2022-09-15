const products = [
  { id: 1, title: 'Notebook', price: 2000, img: "notebook.png" },
  { id: 2, title: 'Mouse', price: 20, img: "mouse.png" },
  { id: 3, title: 'Keyboard', price: 200, img: "keyboard.jfif" },
  { id: 4, title: 'Gamepad', price: 50, img: "gamepad.jpg" },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
  return `<div class="product-item">
            <img  src="./img/products/${product.img}" 
            onerror="this.src='https://via.placeholder.com/150x100'" 
            alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$<span>${product.price}</span></p>
            <button class="buy-btn">Купить</button>
          </div>`
};
const renderPage = list => {
  const productsList = list.map(product => renderProduct(product));
  document.querySelector('.products')
    .insertAdjacentHTML('beforeend', productsList.join(''));
};

renderPage(products);