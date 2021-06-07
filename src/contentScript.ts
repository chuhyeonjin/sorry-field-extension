import * as configManager from './configManager';
import { sorryFieldLoginUrl } from './const';

// Auto login
configManager.getAutoLoginEnable().then((autoLoginEnable) => {
  if (autoLoginEnable) {
    const accountElement = document.querySelector('#stage > header > div');
    const isLogin = accountElement !== null;

    if (!isLogin) {
      location.href = sorryFieldLoginUrl;
    }
  }
});
