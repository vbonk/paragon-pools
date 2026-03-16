/**
 * SignalScore Attribution Snippet v1.0
 * Lightweight traffic intelligence for GEO attribution.
 * Deploy: Add <script src="https://[host]/ss.js" data-client="[slug]" data-stage="prod" async></script>
 */
(function() {
  'use strict';

  var script = document.currentScript;
  var CLIENT = script && script.getAttribute('data-client');
  var STAGE = script && script.getAttribute('data-stage') || 'prod';
  var ENDPOINT = script && script.getAttribute('data-endpoint') || (script && script.src.replace(/\/ss\.js.*/, '/api/attribution'));

  if (!CLIENT || !ENDPOINT) return;

  var data = {
    client_slug: CLIENT,
    site_stage: STAGE,
    referrer: document.referrer || null,
    landing_page: location.pathname + location.search,
    utm_source: getParam('utm_source'),
    utm_medium: getParam('utm_medium'),
    utm_campaign: getParam('utm_campaign'),
    user_agent: navigator.userAgent,
    event_timestamp: new Date().toISOString()
  };

  var maxScroll = 0;
  var startTime = Date.now();
  var sent = false;

  window.addEventListener('scroll', function() {
    var pct = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
    if (pct > maxScroll) maxScroll = Math.min(pct, 100);
  }, { passive: true });

  // Send on page unload
  window.addEventListener('pagehide', function() {
    if (sent) return;
    data.scroll_depth_pct = maxScroll;
    data.session_duration_ms = Date.now() - startTime;
    send(data);
    sent = true;
  });

  // Fallback: send after 2s in case pagehide doesn't fire (Safari, mobile)
  setTimeout(function() {
    if (!sent) {
      data.scroll_depth_pct = maxScroll;
      data.session_duration_ms = Date.now() - startTime;
      send(data);
      sent = true;
    }
  }, 2000);

  // Track form submissions as conversions
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (form && form.tagName === 'FORM') {
      var convData = Object.assign({}, data, {
        conversion_type: 'form',
        scroll_depth_pct: maxScroll,
        session_duration_ms: Date.now() - startTime
      });
      send(convData);
    }
  });

  function send(payload) {
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
