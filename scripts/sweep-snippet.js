(function(){
  var vw = window.innerWidth;
  var o = [];
  document.querySelectorAll('body *').forEach(function(el){
    var r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > vw + 8 && !el.closest('[data-carousel],[class*=slider],[class*=marquee],[class*=scroll],[class*=track]')) {
      if (o.length < 10) o.push({ t: el.tagName, c: String(el.className).slice(0, 60), right: Math.round(r.right), w: Math.round(r.width) });
    }
  });
  return JSON.stringify({
    page: location.pathname,
    vw: vw,
    scrollW: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth > vw,
    culprits: o
  });
})()
