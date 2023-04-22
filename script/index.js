import {el,setChildren} from 'redom';
import CreditCardInputMask from 'credit-card-input-mask';

const createCard = () => {
  const card = el('div', {className: 'card'});
  const cardNumber = el('span', {className: 'card__number'}, 'xxxx xxxx xxxx xxxx');
  const cardName = el('span', {className: 'card__name'}, 'John Doe');
  const cardDate = el('span', {className: 'card__date'}, '04/24');
  const form = el('form', { action: '#', className: 'form', id: 'form' });

  setChildren(card, [
    el('p', {className: 'secure'}, 'Secure Checkout'),
    el('div', {className: 'credit-card'}, [
      cardNumber,
      el('div', {className: 'card__personal'}, [cardName, cardDate]),
    ],
    ),
  ],
  form,
  );

  const inputHolder = el('input', {type:'text', className: 'input input__holder'});
  const inputNumber = el('input', {type:'text', className: 'input input__number'});
  const inputExpiry = el('input', {type:'text', className: 'input input__date'});
  const inputCvv = el('input', {type:'text', className: 'input input__cvv'});

  setChildren(form, [
    el('div', {className: 'form__input-wrap form__input-wrap_holder'}, [
      el('label', {className: 'form__label form__holder-label'}, 'Card Holder'),
      inputHolder,
    ]),
    el('div', {className: 'form__input-wrap form__input-wrap_number'}, [
      el('label', {className: 'form__label form__number-label'}, 'Card Number'),
      inputNumber,
    ]),
    el('div', {className: 'form__input-wrap form__input-wrap_date'}, [
      el('label', {className: 'form__label form__date-label'}, 'Card Expiry'),
      inputExpiry,
    ]),
    el('div', {className: 'form__input-wrap form__input-wrap_cvv'}, [
      el('label', {className: 'form__label form__cvv-label'}, 'CVV'),
      inputCvv,
    ]),
    el('button', {className: 'form__button'}, 'CHECK OUT')
  ]);

  const maskNumber = new CreditCardInputMask({
    element: inputNumber,
    pattern: "{{9999}} {{9999}} {{9999}} {{9999}}",
  });

  const maskDate = new CreditCardInputMask({
    element: inputExpiry,
    pattern: "{{99}}/{{99}}",
  });

  const maskCvv = new CreditCardInputMask({
    element: inputCvv,
    pattern: "{{999}}",
  });


  form.addEventListener('input', ({target}) => {
  if (target === inputHolder) {
    target.value = target.value.replace(/[^a-z ]/i, '');
    cardName.textContent = target.value;
  };
  if (target === inputNumber) {
    cardNumber.textContent = inputNumber.value;
  };
  if (target === inputExpiry) {
    cardDate.textContent = inputExpiry.value;
  };
  });
  
  return el('div', {className: 'wrapper'}, card);
};


setChildren(document.body, createCard());




