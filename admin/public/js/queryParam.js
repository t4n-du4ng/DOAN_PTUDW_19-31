const formQuery = document.getElementById('form-query');
const selectSort = document.getElementById('select-sort');
const btnSubmit = document.getElementById('btn-submit');

formQuery.addEventListener('submit', (event) => {
  const inputs = event.target.getElementsByClassName('query-control');

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '' ||
      inputs[i].value === 'Category' ||
      inputs[i].value === 'Default sorting') {
      inputs[i].disabled = true;
    }
  }
});

const handleSubmit = function() {
  btnSubmit.click();
}

selectSort.addEventListener('change', handleSubmit);