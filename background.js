var hide = true;
var contentScript;

function hideScrollbars() {

	browser.contentScripts.register({
		css: [{
			file: 'content.css'
		}],
		matches: ['<all_urls>'],
		runAt: 'document_start'
	}).then(contentScriptObject => {
		contentScript = contentScriptObject;
	});

	hide = true;
}

function showScrollbars() {
	if (contentScript) {
		contentScript.unregister();
	}

	hide = false;
}

hideScrollbars();
