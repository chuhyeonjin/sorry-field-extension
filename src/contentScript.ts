import * as configManager from './configManager';

// Auto login
configManager.getAutoLoginEnable().then((autoLoginEnable) => {
  if (autoLoginEnable) {
    const accountElement = document.querySelector('#stage > header > div');
    const isLogin = accountElement !== null;

    if (!isLogin) {
      location.href = 'https://sorry.daldalso.com/login';
    }
  }
});
