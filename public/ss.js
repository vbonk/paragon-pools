/**
 * SignalScore Attribution Snippet v1.1
 * Per-client traffic intelligence for GEO attribution.
 * Standard: ai-marketing/standards/analytics.md
 * Deploy: <Script src="/ss.js" data-client="[slug]" strategy="afterInteractive" />
 */
(function() {
  'use strict';
  var script = document.currentScript;
  var CLIENT = script && script.getAttribute('data-client');
  var ENDPOINT = script && script.getAttribute('data-endpoint') ||
    (script && script.src.replace(/\/ss\.js.*/, '/api/attribution'));
  if (!CLIENT || !ENDPOINT) return;

  var data = {
    client: CLIENT,
    referrer: document.referrer || null,
    page: location.pathname + location.search,
    utm_source: getParam('utm_source'),
    utm_medium: getParam('utm_medium'),
    utm_campaign: getParam('utm_campaign')
  };

  var maxScroll = 0;
  var startTime = Date.now();
  var sent = false;

  window.addEventListener('scroll', function() {
    var pct = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
    if (pct > maxScroll) maxScroll = Math.min(pct, 100);
  }, { passive: true });

  window.addEventListener('pagehide', function() {
    if (sent) return;
    send(false);
  });

  // Fallback for Safari/mobile where pagehide may not fire
  setTimeout(function() {
    if (!sent) send(false);
  }, 2000);

  document.addEventListener('submit', function(e) {
    if (e.target && e.target.tagName === 'FORM') {
      send(true);
    }
  });

  function send(isConversion) {
    if (sent) return;
    sent = true;
    var payload = {
      client: data.client,
      referrer: data.referrer,
      page: data.page,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      scroll: maxScroll,
      duration: Date.now() - startTime
    };
    if (isConversion) payload.conversion_type = 'form';
    var body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', ENDPOINT, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(body);
    }
  }

  function getParam(name) {
    var match = location.search.match(new RegExp('[?&]' + name + '=([^&]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }
})();
