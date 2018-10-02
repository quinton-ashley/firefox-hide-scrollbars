var scrollbarsHidden = true;
var contentScript;

function hideScrollbars() {
	var exclude = ['*://*/*.jpg', '*://*/*.png', '*://*/*.gif', '*://*/*.mp4',
		'*://*/*.tiff', '*://*/*.skg', '*://*/*.tif', '*://*/*.avi',
		'*://*/*.mov', '*://*/*.flac', '*://*/*.wav', '*://*/*.aif',
		'*://*/*.m4a', '*://*/*.mqa'
	];
	var i;
	for (i = 0; i < arr.length; i++) {
		exclude.push(exclude[i].toUpperCase());
	}
	var exclude1 = ['*://accounts.google.com/*', '*://photos.google.com/*'];
	exclude = exclude.concat(exclude1);

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
