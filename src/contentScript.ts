import * as configManager from './configManager';
import { sorryFieldLoginUrl } from './const';

// Auto login
// TODO: window.PROPS.page 값을 이용해 특정 페이지 에서만 가능하게 할수 있지 않을까?
configManager.getConfig('autoLoginEnable').then((autoLoginEnable) => {
  if (autoLoginEnable) {
    const accountElement = document.querySelector('#stage > header > div');
    const isLogin = accountElement !== null;

    if (!isLogin) {
      location.href = sorryFieldLoginUrl;
    }
  }
});
