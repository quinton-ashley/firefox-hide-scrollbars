$(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  async function pageLoad() {
    let bg = await browser.runtime.getBackgroundPage();

    function updateButton($button) {
      if (bg.hideScrollbars) {
        $button.removeClass('toggle-ext-on');
        $button.addClass('toggle-ext-off');
        $button.html('show');
      } else {
        $button.removeClass('toggle-ext-off');
        $button.addClass('toggle-ext-on');
        $button.html('hide');
      }
    }

    function update($button) {
      bg.hideScrollbars = !bg.hideScrollbars;
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
