// Dual-role bridge: postMessage is used instead of contentDocument because
// sibling file:// documents are treated as cross-origin by the browser.
(function () {
  if (window.top === window.self) {
    window.addEventListener('message', function (e) {
      if (!e.data || e.data.type !== 'iframe-resize') return;
      var frame = document.querySelector('iframe[data-id="' + e.data.id + '"]');
      if (frame) frame.style.height = e.data.height + 'px';
    });
    return;
  }

  var componentId = document.body.dataset.componentId;
  function notify() {
    window.parent.postMessage({ type: 'iframe-resize', id: componentId, height: document.documentElement.scrollHeight }, '*');
  }
  window.addEventListener('load', notify);
  window.addEventListener('resize', notify);
  new MutationObserver(notify).observe(document.body, { subtree: true, attributes: true, childList: true });
})();
