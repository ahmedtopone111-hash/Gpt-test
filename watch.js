const watchContent = document.querySelector("#watch-content");
const watchParams = new URLSearchParams(window.location.search);
const watchAnimeId = watchParams.get("anime");
const episodeNumber = Number(watchParams.get("episode"));

let watchAnime = null;
let selectedEpisode = null;

for (let i = 0; i < animeList.length; i++) {
  if (animeList[i].id === watchAnimeId) {
    watchAnime = animeList[i];
    break;
  }
}

if (watchAnime) {
  for (let i = 0; i < watchAnime.episodes.length; i++) {
    if (watchAnime.episodes[i].number === episodeNumber) {
      selectedEpisode = watchAnime.episodes[i];
      break;
    }
  }
}

if (!watchAnime || !selectedEpisode) {
  watchContent.innerHTML = `
    <div class="empty-state">
      <h1>Episode not found</h1>
      <a class="main-button" href="episodes.html">Choose an episode</a>
    </div>
  `;
} else {
  renderWatchPage();
}

function renderWatchPage() {
  let moreEpisodes = "";

  const player = selectedEpisode.video
    ? `<iframe src="${selectedEpisode.video}" title="${selectedEpisode.title}" allowfullscreen></iframe>`
    : `
        <div class="video-message">
          <span>▶</span>
          <p>ضع رابط الفيديو داخل data.js</p>
        </div>
      `;

  for (let i = 0; i < watchAnime.episodes.length; i++) {
    const episode = watchAnime.episodes[i];

    moreEpisodes += `
      <a class="small-episode" href="watch.html?anime=${watchAnime.id}&episode=${episode.number}">
        <img src="${episode.image}" alt="${episode.title}" />
        <span>Episode ${episode.number}<b>${episode.title}</b></span>
      </a>
    `;
  }

  watchContent.innerHTML = `
    <a class="back-link" href="episodes.html?anime=${watchAnime.id}">← Back to episodes</a>
    <div class="watch-layout">
      <div>
        <div class="video-box">${player}</div>

        <div class="watch-details">
          <p class="eyebrow">${watchAnime.title}</p>
          <h1>Episode ${selectedEpisode.number}: ${selectedEpisode.title}</h1>
          <p>Enjoy this episode and choose another one from the list.</p>
        </div>
      </div>

      <aside class="more-episodes">
        <h2>More Episodes</h2>
        ${moreEpisodes}
      </aside>
    </div>
  `;
}
