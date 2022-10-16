var pages = ["pages/toolbox.html", "pages/HighlightCard.html"];

(async () => {
  try {
    const src = chrome.runtime.getURL("utils/resource_loader.js");
    await import(src).then(({ default: Helper }) => {
      pages.forEach((page) => {
        Helper.loadHtmlDoc(page);
      });
    });
  } catch (e) {
    console.log(e);
  }
})();
