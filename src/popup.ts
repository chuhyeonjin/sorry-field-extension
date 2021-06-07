import * as tabManager from './tabManager';
import * as configManager from './configManager';
import { sorryFieldUrl } from './const';

const logoutBtn = document.getElementById('logoutBtn');
const autoLoginCheckBox = <HTMLInputElement>document.getElementById('autoLoginCheckBox');

const sessionCookieName = 'sf.id';

import './popup.css';

logoutBtn.addEventListener('click', () => {
  tabManager.getCurrentTab().then((currentTab) => {
    const isSorryField = currentTab.url.startsWith(sorryFieldUrl);

    if (isSorryField) {
      chrome.cookies.remove({ name: sessionCookieName, url: sorryFieldUrl }, () => {});
      chrome.tabs.reload(() => {});
    }
  });
});

autoLoginCheckBox.addEventListener('change', (event) => {
  const checkBox = <HTMLInputElement>event.target;
  const checked = checkBox.checked;

  configManager.setAutoLoginEnable(checked);

  chrome.tabs.reload(() => {});
});

configManager.getAutoLoginEnable().then((autoLoginEnable) => {
  autoLoginCheckBox.checked = autoLoginEnable;
});
