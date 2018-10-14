﻿export default class LinkBuilder {
  buildLink(className, innerHTML, action) {
    let link = document.createElement('a');
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
