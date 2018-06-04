function getScrollbarSize() {
  const div = document.createElement("div");
  div.style.visibility = "hidden";
  div.style.overflow = "scroll";
  document.documentElement.appendChild(div);

  const scrollbarHeight = div.offsetHeight - div.clientHeight;
  const scrollbarWidth = div.offsetWidth - div.clientWidth;

  div.remove();

  return [
    scrollbarWidth,
    scrollbarHeight
  ];
}

document.addEventListener("DOMContentLoaded", () => {
  const [scrollbarWidth, scrollbarHeight] = getScrollbarSize();

  document.body.style.setProperty(
    "--scrollbar-height", `${scrollbarHeight}px`);
  document.body.style.setProperty(
    "--scrollbar-width", `${scrollbarWidth}px`);


  document.body.addEventListener("scroll", ev => {
    const scrollLeft = cloneInto(document.body.scrollLeft, window);
    const scrollTop = cloneInto(document.body.scrollTop, window);
    
    window.wrappedJSObject.scrollX = scrollLeft;
    window.wrappedJSObject.pageXOffset = scrollLeft;
    window.wrappedJSObject.scrollY = scrollTop;
    window.wrappedJSObject.pageYOffset = scrollTop;
  });

  exportFunction(document.body.scroll.bind(document.body), window,
      { defineAs: "scroll" });
  exportFunction(document.body.scrollTo.bind(document.body), window,
      { defineAs: "scrollTo" });
  exportFunction(document.body.scrollBy.bind(document.body), window,
      { defineAs: "scrollBy" });
});


let documentScrollHandler;

Object.defineProperties(Document.prototype, {
  scrollingElement: {
    get () {
      return document.body;
    }
  },
  onscroll: {
    get () {
      return documentScrollHandler;
    },
    set (listener) {
      document.body.addEventListener("scroll", listener);
    }
  }
});


function handleAddScrollEvent () {
  if (arguments[0] === "scroll") {
    document.body.addEventListener(...arguments);
    return;
  }
}
function handleRemoveScrollEvent () {
  if (arguments[0] === "scroll") {
    document.body.removeEventListener(...arguments);
    return;
  }
}


const initial_windowAddEventListener = Window.prototype.addEventListener;
const initial_windowRemoveEventListener = Window.prototype.addEventListener;
const initial_documentAddEventListener = Document.prototype.addEventListener;
const initial_documentRemoveEventListener = Document.prototype.addEventListener;

function windowAddEventListener () {
  handleAddScrollEvent(...arguments);
  initial_windowAddEventListener.apply(this, arguments);
}
function windowRemoveEventListener () {
  handleRemoveScrollEvent(...arguments);
  initial_windowAddEventListener.apply(this, arguments);
}
function documentAddEventListener () {
  console.log(arguments);
  handleAddScrollEvent(...arguments);
  initial_documentAddEventListener.apply(this, arguments);
}
function documentRemoveEventListener () {
  handleRemoveScrollEvent(...arguments);
  initial_documentAddEventListener.apply(this, arguments);
}

exportFunction(windowAddEventListener, Window.prototype,
    { defineAs: "addEventListener" });
exportFunction(windowRemoveEventListener, Window.prototype,
    { defineAs: "removeEventListener" });
exportFunction(documentAddEventListener, Document.prototype,
    { defineAs: "addEventListener" });
exportFunction(documentRemoveEventListener, Document.prototype,
    { defineAs: "removeEventListener" });
