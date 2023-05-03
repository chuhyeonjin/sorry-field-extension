<script lang='ts'>
  import * as tabManager from './tabManager';
  import { sorryFieldUrl } from './const';
  import { getCurrentTab, reloadTab } from './tabManager';
  import * as configManager from './configManager';

  const sessionCookieName = 'sf.id';

  let autoLoginCheckBoxValue = false;
  configManager.getConfig('autoLoginEnable').then((autoLoginEnabled) => {
    autoLoginCheckBoxValue = autoLoginEnabled;
  });

  const logout = () => {
    tabManager.getCurrentTab().then((currentTab) => {
      const isSorryField = currentTab.url.startsWith(sorryFieldUrl);

      if (isSorryField) {
        chrome.cookies.remove({ name: sessionCookieName, url: sorryFieldUrl }, () => {});
        reloadTab();
      }
    });
  }

  const onChangeAutoLoginCheckBox = async () => {
    configManager.setConfig('autoLoginEnable', !autoLoginCheckBoxValue);

    const currentTab = await getCurrentTab();

    if (currentTab.url.startsWith(sorryFieldUrl)) reloadTab();
  }


</script>

<header>
  <h1>SorryField</h1>
</header>

<article>
  <div class="setting-container">
    <div class="item">
      <label for="autoLoginCheckBox">Auto Login</label>
      <input type="checkbox" id="autoLoginCheckBox" on:change={onChangeAutoLoginCheckBox} bind:checked={autoLoginCheckBoxValue} />
    </div>
    <button id="logoutBtn" class="item" on:click={logout}>Logout</button>
  </div>
</article>

<style>
  /* header */

  header h1 {
    font-size: 1.5em;
    margin: 0.2em 0;
  }

  /* setting */

  .setting-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .item label {
    white-space: nowrap;
    text-align: center;
  }

  .item {
    margin: 0.8em 0 0;
  }

  .item input[type='checkbox'] {
    margin: 0;
  }

  div.item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>