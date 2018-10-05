var scrollbarsHidden = true;
var contentScript;
// var exclude1 = ['*://accounts.google.com/*', '*://photos.google.com/*'];
// exclude = exclude.concat(exclude1);

function hideScrollbars() {
	var exts = [
		'jpg', 'png', 'gif', 'mp4', 'tiff', 'skg', 'tif', 'avi', 'mov', 'flac', 'wav', 'aif', 'm4a', 'mqa'
	];
	let exclude = [];
	var i;
	for (i = 0; i < exts.length; i++) {
		exclude.push('*://*/*.' + exts[i]);
		exclude.push('*://*/*.' + exts[i].toUpperCase());
	}
	exclude.push('*://accounts.google.com/*');
	exclude.push('*://mail.google.com/*');
	console.log(exclude);

	browser.contentScripts.register({
		js: [{
			file: 'js/qashto_firefox-hide-scrollbars.user.js'
		}],
		css: [{
			file: 'css/content.css'
		}],
		matches: ['<all_urls>'],
		excludeMatches: exclude,
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
