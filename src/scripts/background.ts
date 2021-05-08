import { saveToStorage, loadFromStorage } from "../utility/storage";
import { getLatestEpisodeID, loadToken } from "../utility/spotify";
import { getNewestArticle } from "../utility/article";
import { getFavoriteStation } from "../utility/bike";
import { getLatestEvent } from "../utility/event";

async function polling() {
  const newestArticle = await getNewestArticle();
  const ID = await getLatestEpisodeID();
  const station = await getFavoriteStation();
  const newestEvent = await getLatestEvent();

  chrome.storage.sync.clear(async () => {
    await saveToStorage("article", JSON.stringify(newestArticle));
    await saveToStorage("id", ID);
    await saveToStorage("station", JSON.stringify(station));
    await saveToStorage("event", JSON.stringify(newestEvent));
  });
}
console.log("Started running background script ...");

polling();

setInterval(polling, 1000 * 60);
