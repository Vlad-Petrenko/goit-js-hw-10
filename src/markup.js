export function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
        <img src="${country.flags.svg}" alt="${country.name.official}" width = 25 height = 20></img>
        <p>${country.name.official}</p>
      </li>`;
    })
    .join('');
  refs.counryList.innerHTML = markup;
}

export function renderCountryInfo(countries) {
  const markup = countries
    .map(country => {
      return `
      <h2><img src="${country.flags.svg}" 
      alt="${country.name.official}" width = 25 height = 20>
      </img>${country.name.official}</h2>
      <p><b>Capital:</b> ${country.capital}</p>
      <p><b>Population:</b> ${country.population}</p>
      <p><b>Languages:</b> ${Object.values(country.languages)}</p>`;
    })
    .join('');
  refs.counryInfo.innerHTML = markup;
}
