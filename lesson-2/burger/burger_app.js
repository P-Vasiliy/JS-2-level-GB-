const structureHamburger = [
  { value: 'small', price: 50, caloricContent: 20, name: 'size' },
  { value: 'big', price: 100, caloricContent: 40, name: 'size' },
  { value: 'cheese', price: 10, caloricContent: 20, name: 'filling' },
  { value: 'lettuce', price: 20, caloricContent: 5, name: 'filling' },
  { value: 'potato', price: 15, caloricContent: 10, name: 'filling' },
  { value: 'spice', price: 15, caloricContent: 0, name: 'additionalFilling' },
  { value: 'mayonnaise', price: 20, caloricContent: 5, name: 'additionalFilling' },
];

class Features {
  constructor(obj) {
    this.name = obj.value;
    this.price = obj.price;
    this.caloric = obj.caloricContent;
  }
}

class Hamburger {
  constructor(size, filling, additionalFilling) {
    this.size = new Features(this._searchContent(size));
    this.filling = new Features(this._searchContent(filling));
    this.additionalFilling = this._searchContentAll(additionalFilling);
  }

  _searchContent(feature) {
    const valueName = document.querySelector(`input[name=${feature}]:checked`);
    const valueContent = structureHamburger.find(element => element.value === valueName.value);

    return valueContent;
  }

  _searchContentAll(feature) {
    const valueName = document.querySelectorAll(`input[name=${feature}]:checked`);
    let valueContent = [];
    let result = [];

    valueName.forEach(el => {
      //console.log('Найденный HTML элемент', el);
      valueContent = structureHamburger.find(element => element.value === el.value);
      result.push(new Features(valueContent));
    });
    return result;
  }

  _sumPrice() {
    let result = this.size.price + this.filling.price;
    this.additionalFilling.forEach(element => result += element.price);
    return result;
  }

  _sumCaloric() {
    let result = this.size.caloric + this.filling.caloric;
    this.additionalFilling.forEach(element => result += element.caloric);
    return result;
  }

  _showSum() {
    document.querySelector('#sumPrice').innerText = this._sumPrice();
    document.querySelector('#sumCaloric').innerText = this._sumCaloric();
  }
}

window.onload = () => {
  document.querySelector("#check").addEventListener('click', event => {
    event.preventDefault();
    const burger = new Hamburger('size', 'filling', 'additionalFilling');
    console.log(burger);
    burger._showSum();
  });
}