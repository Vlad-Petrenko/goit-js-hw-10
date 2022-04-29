import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { renderCountryList, renderCountryInfo } from './markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
  inputCountry: document.querySelector('input#search-box'),
  counryList: document.querySelector('.country-list'),
  counryInfo: document.querySelector('.country-info'),
};

refs.inputCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const input = event.target.value.trim();
  if (!input) {
    cleanMarkup(refs.counryInfo);
    cleanMarkup(refs.counryList);
    return;
  }

  fetchCountries(input)
    .then(data => {
      if (data.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (2 >= data.length <= 10) {
        renderCountryList(data);
        cleanMarkup(refs.counryInfo);
      }
      if (data.length === 1) {
        renderCountryInfo(data);
        cleanMarkup(refs.counryList);
      }
    })
    .catch(onFetchError);
}

function cleanMarkup(data) {
  data.innerHTML = '';
}

function onFetchError() {
  cleanMarkup(refs.counryInfo);
  cleanMarkup(refs.counryList);
  Notify.failure('Oops, there is no country with that name');
}
