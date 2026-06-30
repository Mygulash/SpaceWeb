const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = `<p id="loading">Connecting to NASA...</p>`;

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    let media;

    if (data.media_type === "image") {
      media = `<img class="media" src="${data.url}"/>`;
    } else {
      media = `<video class="media" src="${data.url}" controls></video>`;
    }

    document.querySelector("#app").innerHTML = `
      <h1>${data.title}</h1>
      ${media}
      <p id="information">${data.explanation}</p>
      <p id="information"><b>NASA</b></p>
    `;
  })
  .catch(err => {
    document.querySelector("#app").innerHTML = `<p id="error">Could not load :(</p><p id="errorsub">Try refreshing this page</p>`;
});