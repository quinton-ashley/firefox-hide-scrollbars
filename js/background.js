var hideScrollbars = true;

async function addScripts() {
  await browser.tabs.executeScript({
    file: '/js/qashto_firefox-hide-scrollbars.user.js',
    allFrames: true
  });
}

function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.url) {
    console.log('Tab: ' + tabId +
      ' URL changed to ' + changeInfo.url);
    if (hideScrollbars) {
      addScripts();
    }
  }
}

browser.tabs.onUpdated.addListener(handleUpdated);
