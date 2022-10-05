"use strict";

class Validator {
  constructor() {
    this.patterns = {
      name: /^[a-zа-яё]{2,20}$/ig,
      phone: /^\+?[78]{1}\ ?\(?[0-9]{3}\)?\ ?[0-9]{3}-?\ ?([0-9]{2}-?\ ?){2}$/g,
      email: /^[\w\.-]+@([a-z\d-]+\.{1}){1,2}[a-z\d-]{2,4}$/ig,
    };

    this.paternsError = {
      name: 'Имя содержит только буквы (латиница, кириллица)',
      phone: 'Телефон подчиняется шаблонам: +7(000)000-00-00, 8(000)000-00-00, +70000000000, 80000000000',
      email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
    };

    this.result = {};
    this._validForm();
  }

  _validCheck(form) {
    const inputForm = document.querySelector(`.${form}`);
    inputForm.addEventListener('input', event => {
      const inputContent = event.target.value;
      if (!inputContent.match(this.patterns[form])) {
        inputForm.setAttribute('valid', 'false');
        inputForm.style.border = '2px solid red';
        this._addErrorMsg(form);
      } else {
        inputForm.setAttribute('valid', 'true');
        inputForm.style.border = '2px solid green';
        this._removeErrorMsg(form);
      }
    });
  }

  _validForm() {
    const inputForm = [...document.querySelectorAll('label input')];
    console.log(inputForm);
    inputForm.forEach(el => {
      this._validCheck(el.className);
    });

    document.querySelector('form').addEventListener('input', () => {
      inputForm.forEach(el => {
        let checkAll = [...document.querySelectorAll('label input[valid="true"]')];
        const submitButton = document.querySelector('.submit');

        if (checkAll.length === inputForm.length) {
          submitButton.removeAttribute('disabled');
        } else {
          if (!submitButton.hasAttribute('disabled')) {
            submitButton.setAttribute('disabled', '');
          }
        }
      })
    });
  }

  _addErrorMsg(form) {
    const error = `<p class="error-msg">${this.paternsError[form]}</p>`;
    if (!document.querySelector(`.${form}`).parentNode.querySelector('.error-msg')) {
      document.querySelector(`.${form}`).parentNode.insertAdjacentHTML('beforeend', error);
    }
  }

  _removeErrorMsg(form) {
    const errorMsg = document.querySelector(`.${form}`)
      .parentNode.querySelector('.error-msg')

    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

const valid = new Validator();