var hideScrollbars = true;

async function addScripts() {
  await browser.tabs.executeScript({
    file: '/js/jquery.min.js',
    allFrames: true
  });
  await browser.tabs.executeScript({
    file: '/js/jquery.mousewheel.min.js',
    allFrames: true
  });
  await browser.tabs.executeScript({
    file: '/js/qashto_firefox-hide-scrollbars.js',
    allFrames: true
  });
}

// var OSName = 'Unknown OS';
// if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows';
// if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'macOS';
// if (navigator.appVersion.indexOf('X11') != -1) OSName = 'UNIX';
// if (navigator.appVersion.indexOf('Linux') != -1) OSName = 'Linux';

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
