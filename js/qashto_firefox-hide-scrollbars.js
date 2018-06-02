$(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const er = console.error;
  const log = console.log;
  log('hide-scrollbars');

  $('html, body').css('overflow', 'hidden');

  // https://stackoverflow.com/a/29956714/3792062
  $.fn.isHScrollable = function() {
    return this[0].scrollWidth > this[0].clientWidth;
  };

  $.fn.isVScrollable = function() {
    return this[0].scrollHeight > this[0].clientHeight;
  };

  $.fn.isScrollable = function() {
    return this[0].scrollWidth > this[0].clientWidth || this[0].scrollHeight > this[0].clientHeight;
  };

  let scrollPageX = true;
  let scrollPageY = true;

  $('html, body').mousewheel(function(event) {
    if (scrollPageX && scrollPageY) {
      event.preventDefault();
    }
    if (scrollPageX && scrollPageY && Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      this.scrollLeft += event.deltaX * event.deltaFactor;
    }
    if (scrollPageY && Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
      this.scrollTop -= event.deltaY * event.deltaFactor;
    }
    log(
      event.deltaX,
      event.deltaY,
      event.deltaFactor,
      event.originalEvent.deltaMode,
      event.originalEvent.wheelDelta
    );
  });

  $('textarea, pre').mouseover(function() {
    log($(this).css('overflow-x'));
    if ($(this).isHScrollable()) {
      scrollPageX = false;
      log('false X');
    }
    if ($(this).isVScrollable()) {
      scrollPageY = false;
      log('false Y');
    }
  }).mouseout(function() {
    scrollPageX = scrollPageY = true;
    log('true');
  });
});
