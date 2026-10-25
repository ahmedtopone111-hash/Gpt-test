const pageContent = document.querySelector("#page-content");
const params = new URLSearchParams(window.location.search);
const animeId = params.get("anime");

let selectedAnime = null;

for (let i = 0; i < animeList.length; i++) {
  if (animeList[i].id === animeId) {
    selectedAnime = animeList[i];
    break;
  }
}

if (!animeId) {
  renderAnimeList();
} else if (!selectedAnime) {
  pageContent.innerHTML = `
    <div class="empty-state">
      <h1>Anime not found</h1>
      <a class="main-button" href="episodes.html">Back to anime</a>
    </div>
  `;
} else {
  renderEpisodes(selectedAnime);
}

function renderAnimeList() {
  pageContent.innerHTML = `
    <div class="page-heading">
      <p class="eyebrow">CHOOSE YOUR SHOW</p>
      <h1>Anime Library</h1>
      <p>Select an anime to see all of its episodes.</p>
    </div>
    <div class="anime-grid" id="anime-library"></div>
  `;

  const animeLibrary = document.querySelector("#anime-library");

  for (let i = 0; i < animeList.length; i++) {
    const anime = animeList[i];

    animeLibrary.innerHTML += `
      <a class="anime-card" href="episodes.html?anime=${anime.id}">
        <div class="card-image-wrap">
          <img src="${anime.image}" alt="${anime.title}" />
          <span class="episode-count">${anime.episodes.length} Episodes</span>
        </div>
        <div class="card-content">
          <h2>${anime.title}</h2>
          <p>${anime.description}</p>
          <span class="card-link">View episodes →</span>
        </div>
      </a>
    `;
  }
}

function renderEpisodes(anime) {
  pageContent.innerHTML = `
    <a class="back-link" href="episodes.html">← All anime</a>
    <div class="page-heading anime-heading">
      <p class="eyebrow">NOW WATCHING</p>
      <h1>${anime.title}</h1>
      <p>${anime.description}</p>
    </div>
    <div class="episodes-grid" id="episodes-list"></div>
  `;

  const episodesList = document.querySelector("#episodes-list");

  for (let i = 0; i < anime.episodes.length; i++) {
    const episode = anime.episodes[i];

    episodesList.innerHTML += `
      <a class="episode-card" href="watch.html?anime=${anime.id}&episode=${episode.number}">
        <div class="episode-image-wrap">
          <img src="${episode.image}" alt="${episode.title}" />
          <span class="episode-number">EP ${episode.number}</span>
        </div>
        <div class="episode-info">
          <p>Episode ${episode.number}</p>
          <h2>${episode.title}</h2>
          <span class="watch-link">Watch now →</span>
        </div>
      </a>
    `;
  }
}
