function getValue(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (value) => {
      resolve(value);
    });
  });
}

function setValue(key: string, value: any) {
  chrome.storage.local.set({ [key]: value }, () => {});
}

export function getAutoLoginEnable(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    getValue('autoLoginEnable').then(({ autoLoginEnable }) => {
      const isUndefined = autoLoginEnable === undefined;
      autoLoginEnable = isUndefined ? true : autoLoginEnable;
      if (isUndefined) {
        setAutoLoginEnable(true);
      }
      resolve(autoLoginEnable);
    });
  });
}

export function setAutoLoginEnable(autoLoginEnable: boolean) {
  setValue('autoLoginEnable', autoLoginEnable);
}
