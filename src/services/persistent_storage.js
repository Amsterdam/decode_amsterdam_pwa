var STORAGE = getStorage();

function getStorage() {
  const testItem = "__TEST__";
  const testValue = new Date().toISOString();
  const storage = window.localStorage;
  try {
    storage.setItem(testItem, testValue);
    const value = storage.getItem(testItem);
    storage.removeItem(testItem);
    const nullValue = storage.getItem(testItem);
    if (value === testValue && nullValue === null) {
      return storage;
    }
  } catch (exception) {
    return null;
  }
  return null;
}

export function setItem(key, value) {
  return STORAGE && STORAGE.setItem(key, value);
}

export function getItem(key) {
  return STORAGE && STORAGE.getItem(key);
}

export function removeItem(key) {
  return STORAGE && STORAGE.removeItem(key);
}
