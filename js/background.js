var scrollbarsHidden = true;
var contentScript;

function hideScrollbars () {
  browser.contentScripts.register({
    js: [{
      file: "js/qashto_firefox-hide-scrollbars.user.js"
    }],
    css: [{
      file: "css/content.css"
    }],
    matches: [ "<all_urls>" ],
    runAt: "document_start"
  }).then(contentScriptObject => {
    contentScript = contentScriptObject;
  });

  scrollbarsHidden = true;
}

function showScrollbars () {
  if (contentScript) {
    contentScript.unregister();
  }

  scrollbarsHidden = false;
}

hideScrollbars();
