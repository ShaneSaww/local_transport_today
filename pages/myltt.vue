<template>
  <div>
    <page-header :displayHero="displayHero" :settingsHeader="settingsHeader" :pageName="pageName" />
    <div role="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
      <div role="article" class="mt-10 mx-6 lg:mx-4 max-w-sm md:max-w-lg">
        <h1 class="font-sans font-extrabold text-left leading-tight md:leading-tighter ltt-text-red my-4 text-4xl md:text-6xl"><span class="font-serif italic opacity-75">my</span>LTT</h1>
        <div class="content-text-spacing font-serif mb-4 text-left text-gray-333 leading-normal text-base md:text-xl lg:text-2xl">
          <p>Welcome to your <span class="font-serif italic opacity-75">my</span>LTT section, where you’ll find your <nuxt-link v-scroll-to="{ el: '#bookmarks', offset: -75, duration: 1000 }" to="#bookmarks" class="no-underline hover:underline focus:underline">bookmarked articles</nuxt-link>, our <nuxt-link v-scroll-to="{ el: '#rss', offset: -75, duration: 1000 }" to="#rss" class="no-underline hover:underline focus:underline">RSS feed</nuxt-link>, <nuxt-link v-scroll-to="{ el: '#dark-mode', offset: -75, duration: 1000 }" to="#dark-mode" class="no-underline hover:underline focus:underline">dark mode</nuxt-link> instructions, and your <nuxt-link v-scroll-to="{ el: '#cookie', offset: -75, duration: 1000 }" to="#cookie" class="no-underline hover:underline focus:underline">cookie settings</nuxt-link>.</p>
          <p>Articles can be bookmarked by simply clicking their corresponding bookmark icon <sup class="ltt-text-gray" aria-hidden="true"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="fill-current h-5 w-5"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"></path></svg></sup> making it easier to find all your favourites in one place.</p>
          <p>By choice we don’t provide an account system, which means your bookmarks will only be remembered and stored on your device (rather than our database).</p>
          <p>Please be aware that some web browsers like <em>Safari</em> will delete this data from your device if you don't visit the website at least once during a seven day period.</p>
          <p><em>Safari</em> users on both <em>iPhone</em> and <em>iPad</em> can have their bookmarks kept indefinitely by adding the website to their home screen.</p>
        </div>
        <h2 id="bookmarks" class="font-sans font-extrabold text-left leading-tight md:leading-tighter ltt-text-red mt-8 mb-4 text-4xl md:text-6xl">Bookmarks</h2>
        <div v-if="bookmarkedEditorials.length === 0" class="content-text-spacing font-serif mb-4 text-left text-gray-333 leading-normal text-base md:text-xl">
          <p class="italic">You don’t have any bookmarks saved! Simply click the bookmark icon <sup class="ltt-text-gray" aria-hidden="true"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="fill-current h-5 w-5"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"></path></svg></sup> alongside any article to store them inside <span class="font-serif italic opacity-75">my</span>LTT.</p>
        </div>
        <div role="region" aria-labelledby="bookmarks" aria-live="polite" aria-atomic="false" aria-relevant="removals" class="flex flex-col md:flex-row md:flex-wrap md:justify-between">
          <template v-for="(article, key) in bookmarkedEditorials">
            <transition name="fade">
              <article role="article" class="flex-basis-100 md:flex-basis-50 -mx-4 border-light-gray border border-solid p-4 mb-4 md:mb-8 flex flex-col justify-between">
                <div>
                  <aside role="complementary" class="w-full">
                    <h4 :id="'article-links-title-' + article.md5" class="sr-only no-print">Article Links:</h4>
                    <ul role="list" :aria-labelledby="'article-links-title-' + article.md5" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose text-base pl-0 list-none">
                      <li v-if="article.categories.length > 0" class="inline-block"><nuxt-link class="ltt-text-red no-underline hover:underline focus:underline" :to="'/category/' + slugify(article.categories[0]) + '/'">{{ article.categories[0] }}</nuxt-link></li>
                      <li class="inline-block no-print">
                        <button :title="bookmarked(article.md5) ? 'Remove bookmark': 'Bookmark article'" :class="bookmarked(article.md5) ? 'ani-sparkle-once': ''" class="focus-outline-none leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" @click="toggle(article.md5)">
                          <svg aria-hidden="true" focusable="false" role="img" class="fill-current h-4 w-4" viewBox="0 0 15.789 15.797" xmlns="http://www.w3.org/2000/svg">
                            <path d="m 15.6105,13.277 -5.395,-5.415 5.407,-5.345 c 0.222,-0.222 0.222,-0.584 0,-0.806 L 14.0845,0.165 C 13.9785,0.058 13.8335,0 13.6815,0 c -0.152,0 -0.295,0.062 -0.402,0.165 L 7.8975,5.493 2.5075,0.168 C 2.4005,0.062 2.2565,0.003 2.1045,0.003 c -0.152,0 -0.296,0.062 -0.403,0.165 l -1.535,1.547 c -0.222,0.222 -0.222,0.584 0,0.806 l 5.407,5.346 -5.391,5.41 c -0.107,0.107 -0.168,0.251 -0.168,0.403 0,0.152 0.057,0.296 0.168,0.403 l 1.538,1.546 c 0.111,0.11 0.255,0.168 0.403,0.168 0.144,0 0.292,-0.054 0.403,-0.168 l 5.37,-5.396 5.374,5.391 c 0.111,0.111 0.255,0.169 0.402,0.169 0.145,0 0.293,-0.054 0.402,-0.169 l 1.539,-1.546 c 0.106,-0.106 0.168,-0.25 0.168,-0.402 -0.002,-0.148 -0.065,-0.292 -0.171,-0.399 z" />
                          </svg>
                          <span v-if="bookmarked(article.md5)" class="sr-only">Remove bookmark for this article</span>
                          <span v-else class="sr-only">Bookmark this article</span>
                        </button>
                      </li>
                    </ul>
                  </aside>
                  <h3 class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl md:text-2xl"><nuxt-link rel="bookmark" class="ltt-headline no-underline hover:underline focus:underline" :to="'/' + article.slug + '/'">{{ article.headline }}</nuxt-link></h3>
                  <p class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">{{ article.subHeadline }}</p>
                </div>
                <div>
                  <aside role="complementary" class="w-full">
                    <h4 :id="'article-meta-title-' + article.md5" class="sr-only no-print">Article information:</h4>
                    <ul role="list" :aria-labelledby="'article-meta-title-' + article.md5" class="text-sm ltt-text-gray font-serif font-light md:font-medium leading-loose pl-0 list-none">
                      <li class="pr-8 inline-block"><nuxt-link rel="author" class="ltt-text-red no-underline hover:underline focus:underline" :to="'/author/' + slugify(article.author) + '/'">{{ article.author }}</nuxt-link></li>
                      <li class="pr-8 inline-block"><time :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
                      <li class="inline-block" :aria-label="article.estimatedReadingTimeMinutes + ' minute read'">{{ article.estimatedReadingTimeMinutes }} min read</li>
                    </ul>
                  </aside>
                </div>
              </article>
            </transition>
          </template>
        </div>
        <h2 id="rss" class="font-sans font-extrabold text-left leading-tight md:leading-tighter ltt-text-red mt-8 mb-4 text-4xl md:text-6xl">RSS Feed</h2>
        <div class="content-text-spacing font-serif mb-4 text-left text-gray-333 leading-normal text-base md:text-xl">
          <p>RSS feeds are a convenient way to get updates from a website without visiting the site itself.</p>
          <p>You’ll need a ‘news aggregator’ (or sometimes referred to as a ‘feed reader’) to read RSS feeds, which collect together all the feeds you’ve subscribed to around the web, and displays them in a readable format without any algorithms.</p>
          <p>To subscribe to our feed simply copy and paste the following URL into your preferred feed reader (or use the handy button below).</p>
          <figure>
            <pre id="rss-feed-url" class="text-xs sm:text-sm md:text-base lg:text-xl">{{ rssFeedUrl }}</pre>
            <button @click="copyFeedUrl()" class="focus-outline-none red-block text-base inline-flex flex-row items-center mb-4">
              <svg aria-hidden="true" focusable="false" class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              <span>Copy URL to Clipboard</span>
            </button>
            <span v-if="copyToClipboardMsg" role="alert" aria-live="assertive" aria-atomic="true" aria-relevant="text" class="ml-8 block sm:inline-block ltt-headline">{{ copyToClipboardMsg }}</span>
          </figure>
        </div>
        <h2 id="dark-mode" class="font-sans font-extrabold text-left leading-tight md:leading-tighter ltt-text-red mt-8 mb-4 text-4xl md:text-6xl">Dark Mode</h2>
        <div class="content-text-spacing font-serif mb-4 text-left text-gray-333 leading-normal text-base md:text-xl">
          <p>It’s now possible to read the entire site in dark mode, which is preferable during low light situations or for anyone who suffers from light sensitivity, and also helps to conserve your device’s battery life.</p>
          <div class="flex flex-col md:flex-row md:flex-wrap md:justify-around">
            <figure class="flex-basis-100 md:flex-basis-50 text-center">
              <img loading="lazy" width="250" height="486" src="~assets/img/iphone7_light_mode_optimised.png" alt="The iPhone displaying the website in light mode" />
            </figure>
            <figure class="flex-basis-100 md:flex-basis-50 text-center">
              <img loading="lazy" width="250" height="486" src="~assets/img/iphone7_dark_mode_optimised.png" alt="The iPhone displaying the website in dark mode" />
            </figure>
          </div>
          <p>This setting is device wide, which means you’ll need to enable this option inside your device’s system preferences. As soon as you toggle this setting our website will reflect those changes immediately. You can find instructions on how to change your light/dark preference settings for both <a href="https://www.howtogeek.com/222614/how-to-enable-windows-10s-hidden-dark-theme/" class="no-underline hover:underline focus:underline">Windows</a> and <a href="https://support.apple.com/en-us/HT208976" class="no-underline hover:underline focus:underline">MacOS</a>.</p>
          <p class="no-print" aria-live="polite" aria-atomic="true" aria-relevant="all">You currently have your dark mode setting <strong class="dark-mode-inline">enabled</strong><strong class="light-mode-inline">disabled</strong> on your device.</p>
        </div>
        <h2 id="cookie" class="font-sans font-extrabold text-left leading-tight md:leading-tighter ltt-text-red mt-8 mb-4 text-4xl md:text-6xl">Cookies</h2>
        <div class="content-text-spacing font-serif mb-4 text-left text-gray-333 leading-normal text-base md:text-xl">
          <p>Cookies help our website to remember <nuxt-link to="#bookmarks" class="no-underline hover:underline focus:underline">your bookmarks</nuxt-link>, as well as send anonymised data to <em>Google Analytics</em>, so that we know which articles are more popular with our audience.</p>
          <p>Additional information such as age, gender, and interests are also made available to us but only if they’re available.</p>
          <p>All of this information is completely anonymous, but we appreciate that some users will want to disable this completely. You can achieve this by using the toggle switch immediately below, but please be aware that a cookie will need to be saved onto your device, so that these instructions are remembered going forward.</p>
          <h3 id="toggle-google-analytics">Toggle Google Analytics</h3>
          <div class="checkbox_switch pb-8" aria-live="polite" aria-atomic="false" aria-relevant="text">
            <label><input @click="toggleGoogleAnalyticsToggle()" type="checkbox" aria-labelledby="toggle-google-analytics" name="enableGoogleAnalytics" v-model="enableGoogleAnalytics" /><span v-if="enableGoogleAnalytics" class="pl-2 leading-tight checkbox-label font-sans text-base ltt-headline font-bold hover:underline focus:underline">Enabled</span><span v-else class="pl-2 leading-tight checkbox-label font-sans text-base ltt-headline font-bold hover:underline focus:underline">Disabled</span></label>
          </div>
          <p>If you’d like to go one step further and opt out of being tracked by <em>Google Analytics</em> for all websites, then you can visit <a href="https://tools.google.com/dlpage/gaoptout/" class="no-underline hover:underline focus:underline">Google’s opt-out page</a>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import dayjs from 'dayjs'
import helperSlugify from '~/assets/js/slugify.js'
import pkg from '~/package'
import { mapMutations } from 'vuex'

export default {
  data: function () {
    return {
      displayHero: true,
      displaySidebar: false,
      pageName: 'myltt',
      rssFeedUrl: pkg.homepageURL + '/feed.xml',
      copyToClipboardMsg: null,
      enableGoogleAnalytics: true
    }
  },

  components: {
    PageHeader
  },

  mounted() {
    this.updateBookmarkState()
    this.updateGoogleAnalyticsToggle()
  },

  computed: {
    settingsHeader () {
      return this.$store.getters['settings/retrieveSetting']('header')
    },

    bookmarkedEditorials () {
      let bookmarks = this.allBookmarks()
      return this.$store.getters['editorials/retrieveBookmarkedEditorials'](bookmarks)
    }
  },

  methods: {
    dayjsNuxt (timestamp, format) {
      return dayjs(String(timestamp)).format(String(format))
    },

    slugify (string) {
      return helperSlugify.slugify(string)
    },

    bookmarked (articleMd5) {
      return this.$store.getters['bookmarks/checkBookmark'](articleMd5)
    },

    allBookmarks () {
      return this.$store.getters['bookmarks/retrieveBookmarks']
    },

    ...mapMutations({
      toggle: 'bookmarks/TOGGLE_BOOKMARK',
      updateBookmarkState: 'bookmarks/UPDATE_BOOKMARKS'
    }),

    copyFeedUrl () {
      let urlToCopy = document.getElementById('rss-feed-url')

      let selection = window.getSelection() // Save the selection
      let range = document.createRange()
      range.selectNodeContents(urlToCopy)
      selection.removeAllRanges() // Remove all ranges from the selection
      selection.addRange(range) // Add the new range

      let clipboard = document.execCommand('copy')
      this.copyToClipboardMsg = clipboard ? 'Copied successfully!' : 'Error: Copied unsuccessfully'

      // Remove the selection. Should probably use removeRange(range) when it's supported
      window.getSelection().removeAllRanges()
    },

    toggleGoogleAnalyticsToggle () {
      this.enableGoogleAnalytics = !this.enableGoogleAnalytics

      let toggle = 'false'

      if (this.enableGoogleAnalytics === true) {
        toggle = 'true'
      }

      if (window.localStorage) {
        localStorage.setItem('ga-toggle', toggle)
      }
      else {
        if (process.env.NODE_ENV !== 'production') {
          this.$cookies.set('ga-toggle', toggle, {
            path: '/',
            //maxAge: 60 * 60 * 24 * 365 * 2, // two years
            expires: new Date(new Date().setFullYear(new Date().getFullYear() + 2)), // two years
            sameSite: 'Lax',
            httpOnly: false // Cookies created via JavaScript cannot include the 'HttpOnly' flag (only server-side languages)
          })
        }
        else {
          this.$cookies.set('ga-toggle', toggle, {
            path: '/',
            domain: `${pkg.homepageURL.replace('https://', '').replace('www.', '')}`,
            //maxAge: 60 * 60 * 24 * 365 * 2, // two years
            expires: new Date(new Date().setFullYear(new Date().getFullYear() + 2)), // two years
            sameSite: 'Lax',
            httpOnly: false, // Cookies created via JavaScript cannot include the 'HttpOnly' flag (only server-side languages)
            secure: true
          })
        }
      }
    },

    updateGoogleAnalyticsToggle () {
      let toggle = true

      if (window.localStorage) {
        if (localStorage.getItem('ga-toggle') === 'false') {
          toggle = false
        }
      }
      else {
        if (this.$cookies.get('ga-toggle', { parseJSON: false }) === 'false') {
          toggle = false
        }
      }

      this.enableGoogleAnalytics = toggle
    }
  },

  head() {
    return {
      //__dangerouslyDisableSanitizers: ['script'],
      title: 'myLTT - ' + pkg.description,
      meta: [
        { hid: 'description', name: 'description', content: 'Welcome to your myLTT section, where you’ll find your bookmarked articles, our RSS feed, dark mode instructions, and your cookie settings.' }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL + '/myltt/' }
      ]
    }
  }
}
</script>
