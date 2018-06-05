let documentScrollHandler;
Object.defineProperties(Document.prototype, {
  scrollingElement: {
    get() {
      return document.body;
    }
  },
  onscroll: {
    get() {
      return documentScrollHandler;
    },
    set(listener) {
      if (documentScrollHandler) {
        document.body.removeEventListener("scroll", documentScrollHandler);
      }
      if (listener) {
        documentScrollHandler = listener;
        document.body.addEventListener('scroll', documentScrollHandler);
      }
    }
  }
});
