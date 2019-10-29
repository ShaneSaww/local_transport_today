export default ({ app }) => {
  /*
  ** Only run on client-side and only in production mode
  */
  if (process.env.NODE_ENV !== 'production') return
  /*
  ** Include Google Analytics Script
  **
  ** The alternative async tracking snippet below adds support for preloading, which will provide a small performance boost on modern browsers, but can degrade to synchronous loading and execution on IE 9 and older mobile browsers that do not recognize the async script attribute. Only use this tracking snippet if your visitors primarily use modern browsers to access your site.
  */
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  /*
  ** Using localStorage by default, whilst using cookies if the browser/device doesn't support it
  */

  var GA_LOCAL_STORAGE_KEY = 'ga:clientId';

  if (window.localStorage) {
    ga('create', 'UA-75984540-1', {
      'storage': 'none',
      'clientId': localStorage.getItem(GA_LOCAL_STORAGE_KEY)
    });
    ga(function(tracker) {
      localStorage.setItem(GA_LOCAL_STORAGE_KEY, tracker.get('clientId'));
    });
  }
  else {
    ga('create', 'UA-75984540-1', 'auto')
  }
  /*
  ** Every time the route changes (fired on initialization too)
  */
  app.router.afterEach((to, from) => {
    /*
    ** The AutoTrack addon for Google Analytics (https://github.com/googleanalytics/autotrack)
    */
    ga('require', 'outboundFormTracker');
    ga('require', 'outboundLinkTracker', {
      events: ['click', 'auxclick', 'contextmenu']
    });
    ga('require', 'maxScrollTracker');
    ga('require', 'impressionTracker', {
      elements: ['advert']
    });
    ga('require', 'pageVisibilityTracker');
    /*
    ** When present, the IP address of the sender will be anonymized (helps comply with GDPR)
    */
    ga('set', 'anonymizeIp', true);
    /*
    ** We tell Google Analytics to add a `pageview`
    */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
