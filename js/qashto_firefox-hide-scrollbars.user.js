// ==UserScript==
// @name         Firefox Hide Scrollbars
// @namespace    http://qashto.com/
// @version      2.0.0
// @description  Hide Scrollbars in Firefox
// @author       qashto
// @match        *://*/*
// @exclude      *://www.youtube.com/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

console.log('hiding scrollbars...');

// if used as userscript add style with GM_addStyle
try {
  GM_addStyle(`
    :root {
      --scrollbar-height: 0;
      --scrollbar-width: 0;
      height: 100vh !important;
      overflow: hidden !important;
      position: relative !important;
      width: 100vw !important;
    }

    :root,
    body {
      max-height: initial !important;
      max-width: initial !important;
      min-height: initial !important;
      min-width: initial !important;
    }

    body {
      height: calc(100vh + var(--scrollbar-height)) !important;
      overflow: auto !important;
      width: calc(100vw + var(--scrollbar-width)) !important;
    }
`);
} catch (ror) {}

function getScrollbarSize() {
  const div = document.createElement('div');
  div.style.visibility = 'hidden';
  div.style.overflow = 'scroll';
  document.documentElement.appendChild(div);

  const scrollbarHeight = div.offsetHeight - div.clientHeight;
  const scrollbarWidth = div.offsetWidth - div.clientWidth;

  div.remove();

  return [
    scrollbarWidth,
    scrollbarHeight
  ];
}

document.addEventListener('DOMContentLoaded', () => {
  const [scrollbarWidth, scrollbarHeight] = getScrollbarSize();

  document.body.style.setProperty(
    '--scrollbar-height', `${scrollbarHeight}px`);
  document.body.style.setProperty(
    '--scrollbar-width', `${scrollbarWidth}px`);


  document.body.addEventListener('scroll', ev => {
    const scrollLeft = cloneInto(document.body.scrollLeft, window);
    const scrollTop = cloneInto(document.body.scrollTop, window);

    window.wrappedJSObject.scrollX = scrollLeft;
    window.wrappedJSObject.pageXOffset = scrollLeft;
    window.wrappedJSObject.scrollY = scrollTop;
    window.wrappedJSObject.pageYOffset = scrollTop;
  });

  exportFunction(document.body.scroll.bind(document.body), window, {
    defineAs: 'scroll'
  });
  exportFunction(document.body.scrollTo.bind(document.body), window, {
    defineAs: 'scrollTo'
  });
  exportFunction(document.body.scrollBy.bind(document.body), window, {
    defineAs: 'scrollBy'
  });
});


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
      document.body.addEventListener('scroll', listener);
    }
  }
});


function handleAddScrollEvent() {
  if (arguments[0] === 'scroll') {
    document.body.addEventListener(...arguments);
    return;
  }
}

function handleRemoveScrollEvent() {
  if (arguments[0] === 'scroll') {
    document.body.removeEventListener(...arguments);
    return;
  }
}


const initial_windowAddEventListener = Window.prototype.addEventListener;
const initial_windowRemoveEventListener = Window.prototype.addEventListener;
const initial_documentAddEventListener = Document.prototype.addEventListener;
const initial_documentRemoveEventListener = Document.prototype.addEventListener;

function windowAddEventListener() {
  handleAddScrollEvent(...arguments);
  initial_windowAddEventListener.apply(this, arguments);
}

function windowRemoveEventListener() {
  handleRemoveScrollEvent(...arguments);
  initial_windowAddEventListener.apply(this, arguments);
}

function documentAddEventListener() {
  // console.log(arguments);
  handleAddScrollEvent(...arguments);
  initial_documentAddEventListener.apply(this, arguments);
}

function documentRemoveEventListener() {
  handleRemoveScrollEvent(...arguments);
  initial_documentAddEventListener.apply(this, arguments);
}

exportFunction(windowAddEventListener, Window.prototype, {
  defineAs: 'addEventListener'
});
exportFunction(windowRemoveEventListener, Window.prototype, {
  defineAs: 'removeEventListener'
});
exportFunction(documentAddEventListener, Document.prototype, {
  defineAs: 'addEventListener'
});
exportFunction(documentRemoveEventListener, Document.prototype, {
  defineAs: 'removeEventListener'
});
