// ==UserScript==
// @name         Firefox Hide Scrollbars
// @namespace    http://qashto.com/
// @version      2.0.0
// @description  Hide Scrollbars in Firefox
// @author       qashto
// @match        *://*/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

try {
  console.log('hiding scrollbars...');

  function addStyle(aCss) {
    try {
      GM_addStyle(aCss);
    } catch (ror) {
      let head = document.getElementsByTagName('head')[0];
      if (head) {
        let style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.textContent = aCss;
        head.appendChild(style);
      }
    }
  }

  addStyle(`
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
  });

  console.log('scrollbars hidden!');

} catch (ror) {
  console.error(ror);
}
