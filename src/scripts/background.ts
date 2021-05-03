import { saveToStorage, loadFromStorage } from "../utility/storage";
import { getLatestEpisodeID, loadToken } from "../utility/spotify";
import { getNewestArticle } from "../utility/articles";
import { getFavoriteStations } from "../utility/bikes";
async function polling() {
  const newestArticle = await getNewestArticle();
  const ID = await getLatestEpisodeID();
  const stations = await getFavoriteStations();

  chrome.storage.sync.clear(async () => {
    await saveToStorage("article", JSON.stringify(newestArticle));
    await saveToStorage("id", ID);
    await saveToStorage("stations", JSON.stringify(stations));
  });
}

polling();
setInterval(polling, 1000 * 60);
