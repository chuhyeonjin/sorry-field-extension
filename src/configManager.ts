export function getAutoLoginEnable(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('autoLoginEnable', ({ autoLoginEnable }) => {
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
  chrome.storage.local.set({ autoLoginEnable: autoLoginEnable }, () => {});
}
