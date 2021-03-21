const logoutBtn = document.getElementById("logoutBtn");
const autoLoginCheckBox = document.getElementById("autoLoginCheckBox");

const sorryFieldUrl = "https://sorry.daldalso.com";
const sessionCookieName = "sf.id";

logoutBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    const isSorryField = tabUrl.startsWith(sorryFieldUrl);

    if (isSorryField) {
      chrome.cookies.remove({ name: sessionCookieName, url: sorryFieldUrl }, () => { });
      chrome.tabs.update(tabs[0].id, { url: tab.url });
    };
  });
});

autoLoginCheckBox.addEventListener('change', (event) => {
  const checked = event.target.checked;

  chrome.storage.local.set({ autoLoginEnable: checked }, () => { });

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
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

