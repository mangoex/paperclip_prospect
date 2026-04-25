/* ============================================================
   Humanio — futuristic-v1
   Scroll-scrubbed hero video (desktop, fine pointer)
   Mobile / coarse pointer / reduced-motion → autoplay loop
   ============================================================ */
(function () {
  'use strict';

  var video = document.querySelector('.hero__video');
  if (!video) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var smallScreen = window.innerWidth < 880;

  // Mobile / coarse / reduced-motion → simple autoplay loop, no scrub
  if (prefersReduced || coarse || smallScreen) {
    video.setAttribute('loop', '');
    video.setAttribute('autoplay', '');
    video.muted = true;
    video.playsInline = true;
    video.play().catch(function () { /* autoplay blocked, ignore */ });
    return;
  }

  // Desktop: scroll-scrub
  // Strategy: precompute hero height, map scrollY in [0..heroHeight] to currentTime in [0..duration]
  video.removeAttribute('autoplay');
  video.removeAttribute('loop');
  video.muted = true;
  video.playsInline = true;
  video.pause();

  var hero = document.querySelector('.hero');
  if (!hero) return;

  var ticking = false;
  var lastTime = 0;
  var SCROLL_RANGE_VH = 1.4; // span 140% of hero height for the scrub

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateVideo);
      ticking = true;
    }
  }

  function updateVideo() {
    if (!isFinite(video.duration) || video.duration <= 0) { ticking = false; return; }
    var heroHeight = hero.offsetHeight;
    var scrollRange = heroHeight * SCROLL_RANGE_VH;
    var progress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);
    var target = progress * (video.duration - 0.01);
    // Avoid jitter: only update on meaningful change
    if (Math.abs(target - lastTime) > 0.02) {
      try { video.currentTime = target; } catch (_) {}
      lastTime = target;
    }
    ticking = false;
  }

  function init() {
    if (!isFinite(video.duration) || video.duration <= 0) {
      video.addEventListener('loadedmetadata', init, { once: true });
      return;
    }
    updateVideo();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  if (video.readyState >= 1) init();
  else video.addEventListener('loadedmetadata', init, { once: true });
})();
