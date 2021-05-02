import { saveToStorage, loadFromStorage } from "../utility/storage";
import { getLatestEpisodeID, loadToken } from "../utility/spotify";
import { getNewestArticle } from "../utility/articles";

async function polling() {
  const newestArticle = await getNewestArticle();
  const ID = await getLatestEpisodeID();
  await saveToStorage("article", JSON.stringify(newestArticle));
  await saveToStorage("id", ID);
}

polling();
