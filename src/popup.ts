import * as tabManager from './tabManager';
import * as configManager from './configManager';
import { sorryFieldUrl } from './const';

const logoutBtn = document.getElementById('logoutBtn');
const autoLoginCheckBox = <HTMLInputElement>document.getElementById('autoLoginCheckBox');

const sessionCookieName = 'sf.id';

import './popup.css';
import { getCurrentTab, reloadTab } from './tabManager';

logoutBtn.addEventListener('click', () => {
  tabManager.getCurrentTab().then((currentTab) => {
    const isSorryField = currentTab.url.startsWith(sorryFieldUrl);

    if (isSorryField) {
      chrome.cookies.remove({ name: sessionCookieName, url: sorryFieldUrl }, () => {});
      reloadTab();
    }
  });
});

autoLoginCheckBox.addEventListener('change', async (event) => {
  const checkBox = <HTMLInputElement>event.target;
  const checked = checkBox.checked;

  configManager.setConfig('autoLoginEnable', checked);

  const currentTab = await getCurrentTab();

  if (currentTab.url.startsWith(sorryFieldUrl)) reloadTab();
});

configManager.getConfig('autoLoginEnable').then((autoLoginEnable) => {
  autoLoginCheckBox.checked = autoLoginEnable;
});
