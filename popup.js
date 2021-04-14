window.onload = async (e) => {

	const log = console.log;
	let bg = {
		hide: true
	};
	if (typeof browser != 'undefined') {
		bg = await browser.runtime.getBackgroundPage();
	}
	let tog = document.getElementById('slide');

	tog.onclick = () => {
		log('clicked');

		if (bg.showScrollbars) {
			if (bg.hide) {
				bg.showScrollbars();
			} else {
				bg.hideScrollbars();
			}
		} else {
			bg.hide = !bg.hide;
		}
		tog.checked = bg.hide;
	};

	tog.checked = bg.hide;
}
