export const loadFromStorage = async (
  storageKey: string
): Promise<{ [key: string]: any }> => {
  return new Promise((resolve, reject) =>
    chrome.storage.sync.get(storageKey, (result) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );
};

export const saveToStorage = async (
  key: string,
  toBeSaved: string
): Promise<void> => {
  return new Promise((resolve) =>
    chrome.storage.sync.set({ [key]: toBeSaved }, () => {
      console.log("Saved");
      resolve();
    })
  );
};
