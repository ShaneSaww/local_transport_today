require('dotenv').config()
//require('dotenv').config({ debug: process.env.DEBUG })
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')
import axios from 'axios'
import pageRoutes from './helpers/generateRoutes' // page routes are generated here
import generateFeed from './helpers/generateFeed' // RSS feed is generated here
import generateJson from './helpers/generateJson' // JSON feed is generated here

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

import pkg from './package'

export default {
  mode: 'universal',
  target: 'static',

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
      { name: 'theme-color', content: '#BD2730' },
      //{ name: 'apple:content_id', content: '1532204990' },
      //{ name: 'apple-itunes-app', content: 'app-id=1532204990' },
      { name: 'google-site-verification', content: 'PaRw6hjnWrjXAmjN4AlObf4-NBAOCaNuzFos0uBgryo' },
      { hid: 'description', name: 'description', content: pkg.siteDescription },
      { hid: 'robots', name: 'robots', content: 'index, follow' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:locale', content: 'en_GB' },
      { hid: 'og-type', property: 'og:type', content: 'website' },
      { hid: 'og-title', property: 'og:title', content: pkg.description },
      { hid: 'og-description', property: 'og:description', content: pkg.siteDescription },
      { hid: 'og-url', property: 'og:url', content: pkg.homepageURL },
      { hid: 'og-site-name', property: 'og:site_name', content: pkg.description },
      { hid: 'og-image', property: 'og:image', content: pkg.homepageURL + '/local_transport_today_og_image_white.png' },
      { hid: 'og-image-secure_url', property: 'og:image:secure_url', content: pkg.homepageURL + '/local_transport_today_og_image_white.png' },
      { hid: 'og-image-width', property: 'og:image:width', content: '1200' },
      { hid: 'og-image-height', property: 'og:image:height', content: '628' },
      { hid: 'og-image-alt', property: 'og:image:alt', content: pkg.description + ' logo' },
      { hid: 'twitter-card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter-description', name: 'twitter:description', content: pkg.siteDescription },
      { hid: 'twitter-title', name: 'twitter:title', content: pkg.description },
      { hid: 'twitter-site', name: 'twitter:site', content: '@TransportXtra' },
      { hid: 'twitter-image', name: 'twitter:image', content: pkg.homepageURL + '/local_transport_today_twitter_image_white.png' },
      { hid: 'twitter-image-alt', name: 'twitter:image:alt', content: pkg.description + ' logo' },
      { hid: 'twitter-creator', name: 'twitter:creator', content: '@TransportXtra' },
      { hid: 'application-name', name: 'application-name', content: pkg.description },
      //{ hid: 'msapplication-square70x70logo', name: 'msapplication-square70x70logo', content: pkg.homepageURL + '/msapplication_small.png' },
      //{ hid: 'msapplication-square150x150logo', name: 'msapplication-square150x150logo', content: pkg.homepageURL + '/msapplication_medium.png' },
      //{ hid: 'msapplication-wide310x150logo', name: 'msapplication-wide310x150logo', content: pkg.homepageURL + '/msapplication_wide.png' },
      //{ hid: 'msapplication-square310x310logo', name: 'msapplication-square310x310logo', content: pkg.homepageURL + '/msapplication_large.png' },
      //{ hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#c21136' },
      { hid: 'apple-mobile-web-app-capable', name: 'apple-mobile-web-app-capable', content: 'yes' },
      { hid: 'mobile-web-app-capable', name: 'mobile-web-app-capable', content: 'yes' },
      { hid: 'apple-mobile-web-app-status-bar-style', name: 'apple-mobile-web-app-status-bar-style', content: 'white' },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: 'LTT Discussion' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: pkg.homepageURL + '/favicon.png' },
      { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL },
      { hid: 'rss', rel: 'alternate', type: 'application/rss+xml', title: pkg.description, href: pkg.homepageURL + '/feed.xml' },
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
    googleAnalyticsID: 'UA-166386469-1',
    magicPublishableApiKey: `${process.env.MAGIC_PUBLISHABLE_API_KEY}`,
    urlServerlessFunctions: process.env.NODE_ENV !== 'production' ? 'http://localhost:8888' : pkg.homepageURL
  },

  serverMiddleware: [
    //'~/servermiddleware/test.js'
    //{ path: '/api', handler: '~/api/index.js' }
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
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'vue-scrollto/nuxt',
    'cookie-universal-nuxt',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap'
  ],

  buildModules: [
    //'@nuxtjs/prismic',
    '@/modules/sitemapRouteGenerator'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        return await generateFeed(feed)
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2'
    },
    {
      path: '/feed.json',
      async create(feed) {
        return await generateJson(feed)
      },
      cacheTime: 1000 * 60 * 15,
      type: 'json1'
    }
  ],

  /*feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: pkg.description,
          link: pkg.homepageURL + '/?utm_source=feed&utm_medium=rss&utm_campaign=RSS_Feed',
          id: pkg.homepageURL,
          description: pkg.siteDescription,
          language: 'en-GB',
          copyright: 'Copyright: ' + pkg.description,
          feedLinks: {
            atom: pkg.homepageURL + '/feed.xml'
          }
        }

        let fs = require('fs')
        let path = require('path')

        let months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

        let allEditorials = await fs.readdirSync('./assets/content/editorials').map(file => {
          let editorial = require(`./assets/content/editorials/${file}`)
          let date = editorial.datePublished.split('-')
          let month = parseInt(date[1])

          return {
            ...editorial,
            slug: `${file.replace('.json', '').replace('./', '')}`,
            date: new Date(date[2] + ' ' + months[month - 1] + ' ' + date[0] + ' 00:00:00 GMT')
          }
        })

        allEditorials.sort(function (a, b) {
          if (a.datePublished < b.datePublished) {
            return 1
          }
          if (a.datePublished > b.datePublished) {
            return -1
          }

          return 0 // names must be equal
        })

        let publishedEditorials = allEditorials.filter(x => x.published === true)

        publishedEditorials.forEach(post => {
          feed.addItem({
            title: post.headline,
            id: pkg.homepageURL + '/' + post.slug,
            link: pkg.homepageURL + '/' + post.slug + '/?utm_source=feed&utm_medium=rss&utm_campaign=RSS_Feed',
            description: post.subHeadline,
            author: [
              {
                name: post.author,
                email: pkg.editorialEmail
              }
            ],
            date: post.date
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    }
  ],*/

  router: {
    trailingSlash: true
  },

  generate: {
    interval: 200,
    exclude: [

    ],
    async routes() {
      return await pageRoutes()
    }
  },

  // generate: {
  //   interval: 200,
  //   routes: function () {
  //     const fs = require('fs')
  //     const path = require('path')
  //
  //     let categories = fs.readdirSync('./assets/content/categories').map(file => {
  //       let slug = file.replace('.json', '').replace('./', '')
  //
  //       return {
  //         route: '/category/' + slug + '/',
  //         payload: require(`./assets/content/categories/${file}`)
  //       }
  //     })
  //
  //     let authors = fs.readdirSync('./assets/content/authors').map(file => {
  //       let slug = file.replace('.json', '').replace('./', '')
  //
  //       return {
  //         route: '/author/' + slug + '/',
  //         payload: require(`./assets/content/authors/${file}`)
  //       }
  //     })
  //
  //     let editorials = fs.readdirSync('./assets/content/editorials').map(file => {
  //       let slug = file.replace('.json', '').replace('./', '')
  //
  //       return {
  //         route: '/' + slug + '/',
  //         payload: require(`./assets/content/editorials/${file}`)
  //       }
  //     })
  //
  //     return Promise.all([categories, authors, editorials]).then(values => {
  //       //return values.join().split(',')
  //       return categories.concat(authors, editorials)
  //     })
  //   }
  // },

  sitemap: {
    path: '/sitemap.xml',
    hostname: pkg.homepageURL,
    cacheTime: 1000 * 60 * 15,
    trailingSlash: true,
    exclude: [
      '/search/'
    ],
    xslUrl: '/sitemap.xsl',
    //generate: true, // Enable when using nuxt generate
    routes: [
      '/' // the script will find the other static pages itself
    ]
    /*async routes () {
      let fs = require('fs')
      let path = require('path')

      let allEditorials = await fs.readdirSync('./assets/content/editorials').map(file => {
        let editorial = require(`./assets/content/editorials/${file}`)

        return {
          ...editorial,
          slug: `${file.replace('.json', '').replace('./', '')}`
        }
      })

      let publishedEditorials = allEditorials.filter(x => x.published === true)

      let editorials = publishedEditorials.map((editorial) => {
        return '/' + editorial.slug
      })

      let categories = await fs.readdirSync('./assets/content/categories').map(file => {
        let slug = file.replace('.json', '').replace('./', '')
        return '/category/' + slug
      })

      let authors = await fs.readdirSync('./assets/content/authors').map(file => {
        let slug = file.replace('.json', '').replace('./', '')
        return '/author/' + slug
      })

      return editorials.concat(categories, authors)
    }*/
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
