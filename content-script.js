(async () => {
  try {
    const src = chrome.runtime.getURL("utils/resource_loader.js");
    await import(src).then(({ default: Helper }) => {
      Helper.loadHtmlDoc("pages/toolbox.html");
    });
  } catch (e) {
    console.log(e);
  }
})();
