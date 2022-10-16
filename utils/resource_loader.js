export default class Helpers {
  static loadHtmlDoc(path) {
    let client = new XMLHttpRequest();
    client.open("GET", chrome.runtime.getURL(path));
    client.onreadystatechange = function () {
      if (client.readyState == client.DONE) {
        const html = new DOMParser().parseFromString(
          client.responseText,
          "text/html"
        );
        let element = html.body.firstChild;
        document.body.insertAdjacentElement("beforeend", element);
      }
    };
    client.send();
  }
}
