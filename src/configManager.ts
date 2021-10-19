interface configStructure {
  autoLoginEnable: boolean;
}

const defaultConfig: configStructure = {
  autoLoginEnable: true,
};

export function setConfig<K extends keyof configStructure>(key: K, value: configStructure[K]) {
  chrome.storage.local.set({ [key]: value });
}

export function getConfig<K extends keyof configStructure>(key: K): Promise<configStructure[K]> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (items) => {
      let value: configStructure[K] = items[key];

      if (value === undefined) {
        const defaultValue = defaultConfig[key];

        value = defaultValue;
        setConfig(key, defaultValue);
      }

      resolve(value);
    });
  });
}
