var scrollbarsHidden = true;
var contentScript;

function hideScrollbars() {

	browser.contentScripts.register({
		css: [{
			file: 'css/content.css'
		}],
		matches: ['<all_urls>'],
		runAt: 'document_start'
	}).then(contentScriptObject => {
		contentScript = contentScriptObject;
	});

	scrollbarsHidden = true;
}

function showScrollbars() {
	if (contentScript) {
		contentScript.unregister();
	}

	scrollbarsHidden = false;
}

hideScrollbars();
