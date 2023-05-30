const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const dataValue = []; //to hold the data
window.onload = function () {
  const searchInput = document.querySelector(".search");
  const fetchInitialData = () => {
    fetch(endpoint)
      .then((jsonData) => jsonData.json())
      .then((data) => dataValue.push(...data));
    console.log(dataValue);
  };
  fetchInitialData();
  searchInput.addEventListener("input", handleSearchData);
};
function handleSearchData() {
  console.log(this.value);
  const result = fetchSearchData(this.value, dataValue);
  displayMatches(this.value, result);
}
function fetchSearchData(toBeSearched, fromSearchData) {
  console.log(toBeSearched);
  return fromSearchData.filter((place) => {
    const regex = new RegExp(toBeSearched, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}
function displayMatches(toBeSearched, matches) {
  const suggestionsList = document.querySelector(".suggestions");

  const html = matches
    .map((place) => {
      const regex = new RegExp(toBeSearched, "gi");
      const cityName = place.city.replace(
        regex,
        `<span  style="background:#49aeff">${toBeSearched}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span  style="background:#49aeff">${toBeSearched}</span>`
      );
      return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(
              place.population
            )}</span>
        </li>
        `;
    })
    .join("");
  console.log(html);
  suggestionsList.innerHTML = html;
}
function numberWithCommas(x) {
  const num = parseInt(x).toLocaleString();
  return num;
}
