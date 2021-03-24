const logoutBtn = document.getElementById("logoutBtn");
const autoLoginCheckBox = document.getElementById("autoLoginCheckBox");

const sorryFieldUrl = "https://sorry.daldalso.com";
const sessionCookieName = "sf.id";

import './popup.css';

logoutBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    const isSorryField = tab.startsWith(sorryFieldUrl);

    if (isSorryField) {
      chrome.cookies.remove({ name: sessionCookieName, url: sorryFieldUrl }, () => { });
      chrome.tabs.update(tab.id, { url: tab.url });
    };
  });
});

autoLoginCheckBox.addEventListener('change', (event) => {
  const checked = event.target.checked;

  chrome.storage.local.set({ autoLoginEnable: checked }, () => { });

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    chrome.tabs.update(tab.id, { url: tab.url });
  });
})

chrome.storage.local.get("autoLoginEnable", items => {
  const isUndefined = items.autoLoginEnable === undefined;
  const autoLoginEnable = isUndefined ? true : items.autoLoginEnable;
  if (isUndefined) {
    chrome.storage.local.set({ autoLoginEnable: true }, () => { });
  }
  autoLoginCheckBox.checked = autoLoginEnable;
});

