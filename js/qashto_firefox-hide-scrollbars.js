$(function() {
  const er = console.error;
  const log = console.log;

  let scrollPage = true;

  $('html,body').bind('mousewheel', function(event) {
    if (scrollPage) {
      event.preventDefault();
      var scrollTop = this.scrollTop;
      this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
      log(event.deltaY, event.deltaFactor, event.originalEvent.deltaMode, event.originalEvent.wheelDelta);
    }
  });

  $('textarea').bind('mousewheel', function(event) {
    event.preventDefault();
    var scrollTop = this.scrollTop;
    this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
    log(event.deltaY, event.deltaFactor, event.originalEvent.deltaMode, event.originalEvent.wheelDelta);
  });

  $('textarea').mouseover(function() {
    scrollPage = false;
  }).mouseout(function() {
    scrollPage = true;
  });
});
