export default class LinkBuilder {
  static buildLink(className, innerHTML, action) {
    const link = document.createElement('a');
    link.href = '#';
    link.classList.add('slidesjs-navigation');

    if (className) {
      link.classList.add(className);
    }
    if (innerHTML) {
      link.innerHTML = innerHTML;
    }
    if (action) {
      link.onclick = action;
    }

    return link;
  }
}
