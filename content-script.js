var pages = [
  "pages/toolbox.html",
  "pages/AddComments.html",
  "pages/AddSection.html",
];

let sectionController = function () {
  document
    .querySelector("#bindr-section-card-text")
    .addEventListener("change", function () {
      function getId(url) {
        var regExp =
          /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
          return match[2];
        } else {
          return;
        }
      }

      var home = document.querySelector("#bindr-section-card-text").value;
      var myId = getId(home);

      document.querySelector("#home").innerHTML =
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
        myId +
        '" id="vidplayer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br><br>';
    });
};

let bodyLoaded = new Event("Body-Loaded", { bubbles: true }); // (2)
document.addEventListener("Body-Loaded", (e) => {
  sectionController();
});

var scripts = ["pages/AddComments_Script.html", "pages/AddSection_Script.html"];

(async () => {
  try {
    const src = chrome.runtime.getURL("utils/resource_loader.js");
    await import(src).then(({ default: Helper }) => {
      Helper.loadHtmlHead("pages/Headers.html", (e) => {
        document.getElementsByTagName("head")[0].appendChild(e);
      });

      // Lead helper Scripts for components
      scripts.forEach((page) => {
        Helper.loadHtmlHead(page, (e) =>
          document.getElementsByTagName("head")[0].appendChild(e)
        );
      });

      pages.forEach((page, idx) => {
        if (idx < pages.length - 1) {
          Helper.loadHtmlBody(page, (e) => {
            document.body.insertAdjacentElement("beforeend", e);
          });
        } else {
          Helper.loadHtmlBody(page, (e) => {
            document.body.insertAdjacentElement("beforeend", e);
            e.dispatchEvent(bodyLoaded);
          });
        }
      });
      console.log("loaded all");

      // document.querySelector("#bindr-section-card-text").onChange(function (e) {
      //   console.log({ e });
      // });
    });
  } catch (e) {
    console.log(e);
  }
})();
