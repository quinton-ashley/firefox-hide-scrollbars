$(function() {
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;

	async function pageLoad() {
		let bg = await browser.runtime.getBackgroundPage();

		function updateButton($button) {
			console.log(bg.scrollbarsHidden);
			if (bg.scrollbarsHidden) {
				$button.removeClass('toggle-ext-on');
				$button.addClass('toggle-ext-off');
				$button.html(bg.exclude);
			} else {
				$button.removeClass('toggle-ext-off');
				$button.addClass('toggle-ext-on');
				$button.html('enable');
			}
		}

		function update($button) {
			if (bg.scrollbarsHidden) {
				bg.showScrollbars();
			} else {
				bg.hideScrollbars();
			}
			updateButton($button);
		}

		$('.toggle-ext').click(function() {
			console.log('clicked');
			update($(this));
		});

		updateButton($('.toggle-ext'));
	}

	pageLoad();
});
