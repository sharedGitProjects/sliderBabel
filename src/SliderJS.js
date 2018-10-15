﻿import LinkBuilder from './LinkBuilder';

export default class SliderJS {
  constructor(containerId, options = {}) {
    this._topContainer = null;
    this._slides = [];
    this._currentSlideIndex = 0;
    this._options = options;
    this._containerId = containerId;
    this._autoplayKey = null;
    this._width = 800;
    this._height = 400;
    this._playing = false;
    this._linkBuilder = LinkBuilder;
    this.init();
    this._touchState = {
      isActive: false, x: 0, y: 0, minDiff: 50,
    };
  }

  init() {
    if (!this._containerId) {
      console.error('Не задан ИД контейнера картинок');
      return;
    }

    this._topContainer = document.getElementById(this._containerId);
    if (!this._topContainer) {
      console.error('Не найден контейнер картинок');
      return;
    }

    this.initSlides();
    this.initContainer();
    if (!this._options.hideControls) {
      this.addPrevLink();
      this.addNextLink();

      if (this._options.autoplay) {
        this.addAutoplay();
        this.addPause();
      }
    } else if (this._options.autoplay) {
      this.autoplay();
    }
  }

  initContainer() {
    const self = this;
    const slidesContainer = document.createElement('div');
    slidesContainer.classList.add('slidesjs-container');
    slidesContainer.style.width = `${this._width}px`;
    slidesContainer.style.height = `${this._height}px`;
    slidesContainer.addEventListener('transitionend', () => {
      self._playing = false;
    });

    slidesContainer.addEventListener('touchstart', (e) => {
      self._touchState.isActive = true;
      self._touchState.x = e.changedTouches[0].pageX;
      self._touchState.y = e.changedTouches[0].pageY;
    });

    slidesContainer.addEventListener('touchend', (e) => {
      self._touchState.isActive = false;
      const diffX = e.changedTouches[0].pageX - self._touchState.x;
      self._touchState.x = 0;
      if (diffX > self._touchState.minDiff) {
        self.prev.call(self);
      } else if ((-1 * diffX) > (-1 * self._touchState.minDiff)) {
        self.next.call(self);
      }
    });

    const slidesControl = document.createElement('div');
    slidesControl.classList.add('slidesjs-control');
    slidesControl.style.width = `${this._width}px`;
    slidesControl.style.height = `${this._height}px`;
    slidesContainer.appendChild(slidesControl);

    for (let i = 0; i < this._slides.length; i++) {
      slidesControl.appendChild(this._slides[i]);
    }

    this._topContainer.appendChild(slidesContainer);
  }

  initSlides() {
    this._topContainer.classList.add('slides');

    const slides = this._topContainer.querySelectorAll('.slides > div,img');
    if (slides.length === 0) {
      return;
    }

    const prevIndex = slides.length - 1;
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      slide.classList.add('slidesjs-slide');

      if (i > 1 && i !== prevIndex) {
        slide.style.display = 'none';
      }

      if (i === prevIndex) {
        slide.style.left = `-${this._width}px`;
      }

      if (i === 1) {
        slide.style.left = `${this._width}px`;
      }

      if (i === 0) {
        slide.style.left = '0';
      }

      this._slides.push(slide);
    }
  }

  addLink(className, innerHTML, action) {
    const link = this._linkBuilder.buildLink(className, innerHTML, action);
    this._topContainer.appendChild(link);
    return link;
  }

  addAutoplay() {
    this.addLink('slidesjs-autoplay', '►', this.autoplay.bind(this));
  }

  addPause() {
    const link = this.addLink('slidesjs-pause', '❚❚', this.pause.bind(this));
    link.style.display = 'none';
  }

  addPrevLink() {
    this.addLink('slidesjs-previous', '←', this.prev.bind(this));
  }

  addNextLink() {
    this.addLink('slidesjs-next', '→', this.next.bind(this));
  }

  getPrevIndex(currentIndex) {
    if (this._slides.length === 0) {
      return 0;
    }

    let prevIndex;
    if (currentIndex === 0) {
      prevIndex = this._slides.length - 1;
    } else {
      prevIndex = currentIndex - 1;
    }
    return prevIndex;
  }

  getNextIndex(currentIndex) {
    if (this._slides.length === 0) {
      return 0;
    }

    let nextIndex;
    if (currentIndex < this._slides.length - 1) {
      nextIndex = currentIndex + 1;
    } else {
      nextIndex = 0;
    }
    return nextIndex;
  }

  autoplay() {
    if (this._slides.length < 1) {
      return;
    }

    const autoplayLink = this._topContainer.querySelector('.slidesjs-autoplay');
    if (autoplayLink) {
      autoplayLink.style.display = 'none';
    }

    const pauseLink = this._topContainer.querySelector('.slidesjs-pause');
    if (pauseLink) {
      pauseLink.style.display = 'inline';
    }

    let interval = this._options.autoplayInterval;
    if (!interval || interval < 1000) {
      interval = 1000;
    }

    this.next();
    this._autoplayKey = setInterval(this.next.bind(this), interval);
  }

  pause() {
    if (!this._autoplayKey) {
      return;
    }

    clearInterval(this._autoplayKey);
    this._autoplayKey = null;

    const autoplayLink = this._topContainer.querySelector('.slidesjs-autoplay');
    if (autoplayLink) {
      autoplayLink.style.display = 'inline';
    }

    const pauseLink = this._topContainer.querySelector('.slidesjs-pause');
    if (pauseLink) {
      pauseLink.style.display = 'none';
    }
  }

  prev() {
    if (this._slides.length < 1) {
      return;
    }

    if (this._playing) {
      return;
    }

    this._playing = true;

    const nextIndex = this.getNextIndex(this._currentSlideIndex);
    this._slides[nextIndex].style.display = 'none';

    this._slides[this._currentSlideIndex].style.left = `${this._width}px`;
    this._slides[this._currentSlideIndex].style.zIndex = '10';

    const prevIndex = this.getPrevIndex(this._currentSlideIndex);

    const prevPrevIndex = this.getPrevIndex(prevIndex);
    if (this._slides.length > 3) {
      this._slides[prevPrevIndex].style.display = 'block';
    }
    this._slides[prevPrevIndex].style.left = `-${this._width}px`;

    this._slides[prevIndex].style.display = 'block';
    this._slides[prevIndex].style.left = '0px';

    this._currentSlideIndex = prevIndex;
  }

  next() {
    if (this._slides.length < 1) {
      return;
    }

    if (this._playing) {
      return;
    }

    this._playing = true;

    const prevIndex = this.getPrevIndex(this._currentSlideIndex);
    this._slides[prevIndex].style.display = 'none';

    this._slides[this._currentSlideIndex].style.left = `-${this._width}px`;

    const nextIndex = this.getNextIndex(this._currentSlideIndex);

    const nextNextIndex = this.getNextIndex(nextIndex);
    if (this._slides.length > 3) {
      this._slides[nextNextIndex].style.display = 'block';
    }
    this._slides[nextNextIndex].style.left = `${this._width}px`;

    this._slides[nextIndex].style.display = 'block';
    this._slides[nextIndex].style.left = '0px';

    this._currentSlideIndex = nextIndex;
  }
}
