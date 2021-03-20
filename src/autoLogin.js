const isLogin = document.querySelector("#stage > header > div") !== null;

if (!isLogin) {
  chrome.storage.local.get("autoLoginEnable", items => {
    if (items.autoLoginEnable === undefined) {
      chrome.storage.local.set({ autoLoginEnable: true }, () => { });
    } else if (items.autoLoginEnable) {
      location.href = "https://sorry.daldalso.com/login";
    }
  });
}


