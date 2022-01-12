import * as configManager from './configManager';
import { sorryFieldLoginUrl, propScriptPattern } from './const';

let propScript: string;

for (const script of document.scripts) {
  if (!script.innerText.startsWith(propScriptPattern)) continue;
  propScript = script.innerText.substring(propScriptPattern.length);
  break;
}

if (!propScript) throw new Error("props doesn't exist");

const prop = JSON.parse(propScript);

// Auto login
configManager.getConfig('autoLoginEnable').then((autoLoginEnable) => {
  if (autoLoginEnable) {
    const accountElement = document.querySelector('#stage > header > div');
    const isLogin = accountElement !== null;

    if (!isLogin) {
      location.href = sorryFieldLoginUrl;
    }
  }
});
