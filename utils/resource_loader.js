export default class Helpers {
  static loadHtmlBody(path, callback) {
    let client = new XMLHttpRequest();
    client.open("GET", chrome.runtime.getURL(path));
    client.onreadystatechange = function () {
      if (client.readyState == client.DONE) {
        const html = new DOMParser().parseFromString(
          client.responseText,
          "text/html"
        );
        let element = html.body.firstChild;
        callback(element);
      }
    };
    client.send();
  }

  static loadHtmlHead(path, callback) {
    let client = new XMLHttpRequest();
    client.open("GET", chrome.runtime.getURL(path));
    client.onreadystatechange = function () {
      if (client.readyState == client.DONE) {
        const html = new DOMParser().parseFromString(
          client.responseText,
          "text/html"
        );
        for (let elem of html.head.children) {
          callback(elem);
        }
      }
    };
    client.send();
  }
}
