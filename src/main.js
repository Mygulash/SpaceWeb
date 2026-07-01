const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const appDiv = document.querySelector("#app");
const datePicker = document.querySelector("#date-picker");
const fetchButton = document.querySelector("#fetch-button");

datePicker.max = new Date().toISOString().split("T")[0];

document.querySelector("#app").innerHTML = `<p id="loading">Connecting to NASA...</p>`;

function getNASAData(date = "") {
  appDiv.innerHTML = `<p id="loading">Connecting to NASA...</p>`;

  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  if (date) {
    url += `&date=${date}`;
  }

  fetch(url).then(response => response.json()).then(data => {
    let media;

    if (data.media_type === "image") {
      media = `<img class="media" src="${data.url}"/>`;
    } else {
      media = `<video class="media" src="${data.url}" controls></video>`;
    }

    appDiv.innerHTML = `
      <h1>${data.title}</h1>
      ${media}
      <p id="information">${data.explanation}</p>
      <p id="information"><b>NASA</b></p>
    `;
  })
  .catch(err => {
    document.querySelector("#app").innerHTML = `<p id="error">Could not load :(</p><p id="errorsub">Try refreshing this page</p>`;
  });
}

fetchButton.addEventListener("click", () => {
  const selectedDate = datePicker.value;
  getNASAData(selectedDate);
})

getNASAData();