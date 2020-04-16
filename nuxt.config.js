require('dotenv').config()
//require('dotenv').config({ debug: process.env.DEBUG })
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')
import axios from 'axios' // we'll need this later for our dynamic routes

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    htmlAttrs: {
      lang: 'en-GB',
      dir: 'ltr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'robot', name: 'robot', content: 'index, follow' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:locale', content: 'en_GB' },
      { hid: 'og-type', property: 'og:type', content: 'website' },
      { hid: 'og-title', property: 'og:title', content: 'Northern Travel & Tourism Show' },
      { hid: 'og-description', property: 'og:description', content: 'Northern Travel & Tourism Show is the north’s leading travel show for group travel organisers, travel trade and tour operators.' },
      { hid: 'og-url', property: 'og:url', content: pkg.homepageURL },
      { hid: 'og-site-name', property: 'og:site_name', content: 'Northern Travel & Tourism Show' },
      { hid: 'og-image', property: 'og:image', content: pkg.homepageURL + '/local_transport_today_og_image_white.png' },
      { hid: 'og-image-secure_url', property: 'og:image:secure_url', content: pkg.homepageURL + '/local_transport_today_og_image_white.png' },
      { hid: 'og-image-width', property: 'og:image:width', content: '1200' },
      { hid: 'og-image-height', property: 'og:image:height', content: '628' },
      { hid: 'og-image-alt', property: 'og:image:alt', content: 'Northern Travel & Tourism Show logo' },
      { hid: 'twitter-card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter-description', name: 'twitter:description', content: 'Northern Travel & Tourism Show is the north’s leading travel show for group travel organisers, travel trade and tour operators.' },
      { hid: 'twitter-title', name: 'twitter:title', content: 'Northern Travel & Tourism Show' },
      { hid: 'twitter-site', name: 'twitter:site', content: '@TransportXtra' },
      { hid: 'twitter-image', name: 'twitter:image', content: pkg.homepageURL + '/local_transport_today_twitter_image_white.png' },
      { hid: 'twitter-creator', name: 'twitter:creator', content: '@TransportXtra' },
      { hid: 'application-name', name: 'application-name', content: 'Northern Travel & Tourism Show' },
      { hid: 'msapplication-square70x70logo', name: 'msapplication-square70x70logo', content: pkg.homepageURL + '/msapplication_small.png' },
      { hid: 'msapplication-square150x150logo', name: 'msapplication-square150x150logo', content: pkg.homepageURL + '/msapplication_medium.png' },
      { hid: 'msapplication-wide310x150logo', name: 'msapplication-wide310x150logo', content: pkg.homepageURL + '/msapplication_wide.png' },
      { hid: 'msapplication-square310x310logo', name: 'msapplication-square310x310logo', content: pkg.homepageURL + '/msapplication_large.png' },
      { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#c21136' },
      { hid: 'apple-mobile-web-app-capable', name: 'apple-mobile-web-app-capable', content: 'yes' },
      { hid: 'mobile-web-app-capable', name: 'mobile-web-app-capable', content: 'yes' },
      { hid: 'apple-mobile-web-app-status-bar-style', name: 'apple-mobile-web-app-status-bar-style', content: 'white' },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: 'NorthernShow' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: pkg.homepageURL + '/favicon.png' },
      { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL },
      { href: pkg.homepageURL + '/2048x2692.png', media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit device-pixel-ratio: 2) and (orientation: portrait)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/2008x2732.png', media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/1668x2184.png', media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/1628x2224.png', media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/1536x2008.png', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/1496x2048.png', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/768x1004.png', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: portrait)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/748x1024.png', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: landscape)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/1125x2376.png', media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/1242x2148.png', media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/1182x2208.png', media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/750x1294.png', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/640x1096.png', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/640x920.png', media: '(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)', rel: 'apple-touch-startup-image' },
      { href: pkg.homepageURL + '/320x460.png', media: '(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)', rel: 'apple-touch-startup-image' },
      { rel: 'apple-touch-icon-precomposed', href: pkg.homepageURL + '/touch-icon-iphone.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: pkg.homepageURL + '/touch-icon-ipad.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: pkg.homepageURL + '/touch-icon-iphone-retina.png' },
      { rel: 'apple-touch-icon', sizes: '167x167', href: pkg.homepageURL + '/touch-icon-ipad-retina.png' }
    ]
  },

  env: {
    //retrieveEditorialsUrl: `${process.env.CMS_URL}${process.env.READ_EDITORIALS_PATH}?token=${process.env.READ_EDITORIALS_TOKEN}`
  },

  serverMiddleware: [
    //'~/servermiddleware/seo.js'
  ],

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#a60f29' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/intersection-observer.js', mode: 'client' },
    { src: '~/plugins/google-analytics.js', mode: 'client' },
    { src: '~/plugins/autotrack.js', mode: 'client' },
    { src: '~/plugins/vue-scrollto.js', mode: 'server'}
    //{ src: '~/plugins/helper.js', mode: 'server'}
    //{ src: '~/plugins/imagesloaded.pkgd.min.js', mode: 'client' },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-leaflet',
    'vue-scrollto/nuxt'
    //['nuxt-leaflet', { /* module options */ }],
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    //vendor: ['jspostcode'],
    //transpile: [/^vue2-google-maps($|\/)/],
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev }) {
      if (!isDev) {
        // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
        // for more information about purgecss.
        config.plugins.push(
          new PurgecssPlugin({
            // Specify the locations of any files you want to scan for class names.
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            extractors: [
              {
                extractor: TailwindExtractor,
                // Specify the file extensions to include when scanning for
                // class names.
                extensions: ["html", "vue"]
              }
            ],
            whitelist: [
              "html",
              "body",
              "ul",
              "ol",
              "pre",
              "code",
              "blockquote"
            ],
            whitelistPatterns: [/\bhljs\S*/]
          })
        )
      }
    }
  }
}
