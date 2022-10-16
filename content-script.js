var pages = [
  "pages/toolbox.html",
  "pages/AddComments.html",
  "pages/AddSection.html",
  "pages/StickyNote.html",
  "pages/VidNoteBlock.html",
  "pages/VidNoteOpen.html",
];

let sectionController = function (elem) {
  elem.addEventListener("change", function (evt) {
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

    var home = evt.target.value;
    var myId = getId(home);

    document.querySelector("#home").innerHTML =
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
      myId +
      '" id="vidplayer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br><br>';
  });
};

let addSectionHandler = function (evt) {
  var elem = document.querySelector("#bindr-section-card-template");
  var clone = elem.cloneNode(true);
  clone.id = null;
  clone.classList.remove("hidden");
  sectionController(clone);
  evt.target.after(clone);
  document.removeEventListener("click", addSectionHandler, true);
};

let addVidBoxBtn = function (video) {
  var elem = document.querySelector("#bindr-vid-note-btn-template");
  var clone = elem.cloneNode(true);
  clone.id = null;
  clone.classList.remove("hidden");
  video.after(clone);
};

let videoBoxOpenHandler = function (evt) {
  var source = evt.srcElement || evt.originalTarget;
  var elem = document.querySelector("#bindr-vid-note-block-template");
  var clone = elem.cloneNode(true);
  clone.id = null;
  clone.classList.remove("hidden");
  source.after(clone);
};

function dragElement(elmnt) {
  console.log(elmnt);
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "Dragger")) {
    /* if present, the Dragger is where you move the DIV from:*/
    document.getElementById(elmnt.id + "Dragger").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

let bodyLoaded = new Event("Body-Loaded", { bubbles: true }); // (2)
document.addEventListener("Body-Loaded", (e) => {
  dragElement(document.querySelector("#bindr-toolbox"));
  document
    .querySelector("#bindr-toolbox-section")
    .addEventListener(
      "click",
      (e) => document.addEventListener("click", addSectionHandler, true),
      true
    );
  addVidBoxBtn(document.querySelector("#center"));
  document.addEventListener("VidBlock-Open", videoBoxOpenHandler, true);
});

// var scripts = ["pages/AddComments_Script.html", "pages/AddSection_Script.html"];

(async () => {
  try {
    const src = chrome.runtime.getURL("utils/resource_loader.js");
    await import(src).then(({ default: Helper }) => {
      Helper.loadHtmlHead("pages/Headers.html", (e) => {
        document.getElementsByTagName("head")[0].appendChild(e);
      });

      // Lead helper Scripts for components
      // scripts.forEach((page) => {
      //   Helper.loadHtmlHead(page, (e) =>
      //     document.getElementsByTagName("head")[0].appendChild(e)
      //   );
      // });

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
