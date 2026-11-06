(function () {
  'use strict';

  /* 滚动渐入 */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i % 4, 3) * 40) + 'ms';
    io.observe(el);
  });

  /* 顶栏描边 */
  var bar = document.querySelector('.topbar');
  var onScroll = function () {
    if (window.scrollY > 12) bar.classList.add('stuck');
    else bar.classList.remove('stuck');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 卡片指针跟随的微光（桌面） */
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (ev) {
        var r = card.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width - 0.5;
        var y = (ev.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          'translateY(-9px) rotateX(' + (-y * 2.2).toFixed(2) + 'deg) rotateY(' +
          (x * 2.2).toFixed(2) + 'deg)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  }
})();
