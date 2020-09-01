import './style.scss';

(() => {
  const form = document.querySelector('.form');
  const fields = form.querySelectorAll('.input__item');
  const submitBtn = form.querySelector('.submit-btn');

  let inputValue;

  const findValue = () => {
    const notEmptyFields = [...fields].filter((el) => el.value);
    return notEmptyFields[notEmptyFields.length - 1] || fields[0];
  };

  const findEmpty = () => {
    return [...fields].find((el) => !el.value) || fields[fields.length - 1];
  };

  const serialize = () => {
    inputValue = '';
    fields.forEach((el) => inputValue += el.value);
    submitBtn.toggleAttribute('disabled', inputValue.length !== fields.length);
  };

  fields.forEach((el) => {
    const elMaxLength = el.getAttribute('max') || el.getAttribute('maxLength') || 1;

    el.addEventListener('focus', (evt) => {
      evt.target.value = evt.target.value;
      findEmpty().focus();
    });

    el.addEventListener('keydown', (evt) => {
      const lastValueField = findValue();
      const val = evt.target.value;

      if (evt.keyCode === 8 && !val) {
        lastValueField.value = null;
        lastValueField.focus();
        serialize();
      }
    });

    el.addEventListener('input', (evt) => {
      const val = evt.target.value;

      if (!val.trim()) evt.target.value = null;

      if (val && val.length >= elMaxLength) {
        findEmpty().focus();
        evt.target.value = val.slice(0, elMaxLength).trim();
      };

      serialize();
    });
  });

  form.onsubmit = (evt) => {
    evt.preventDefault();

    alert(`Value is: ${inputValue}`);
  };
})();
