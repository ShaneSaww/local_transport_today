<template>
  <div>
    <page-header :displayHero="displayHero" :settingsHeader="settingsHeader" :pageName="pageName" />
    <h1 class="sr-only"><nuxt-link exact to="/">Local Transport Today Discussion</nuxt-link></h1>
    <div role="main" id="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
      <div class="w-full mt-10 mx-6 lg:mx-4 print:mx-0">
        <div :class="latestEditorials.length > 5 ? 'newspaper': 'newspaper-truncated'">
          <template v-for="(article, key) in latestEditorials" v-if="key <= 6">
            <div :class="'cell cell--' + key">
              <article role="article" class="article-item">
                <aside role="complementary" class="w-full">
                  <h4 :id="'article-links-title-' + key" class="sr-only no-print">Article Links:</h4>
                  <ul role="list" :aria-labelledby="'article-links-title-' + key" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose text-base pl-0 list-none">
                    <li v-if="article.categories.length > 0" class="inline-block"><nuxt-link class="ltt-text-red no-underline hover:underline focus:underline" :to="'/category/' + slugify(article.categories[0]) + '/'">{{ article.categories[0] }}</nuxt-link></li>
                    <li class="inline-block no-print">
                      <button :title="bookmarked(article.md5) ? 'Remove bookmark': 'Bookmark article'" :class="bookmarked(article.md5) ? 'ani-sparkle-once': ''" class="focus-outline-none leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" @click="toggle(article.md5)">
                        <svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path :d="bookmarked(article.md5) ? 'M 17,3 H 7 C 5.9,3 5,3.9 5,5 v 16 l 7,-3 7,3 V 5 C 19,3.9 18.1,3 17,3 Z': 'M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z'" />
                        </svg>
                        <span v-if="bookmarked(article.md5)" class="sr-only">Remove bookmark for this article</span>
                        <span v-else class="sr-only">Bookmark this article</span>
                      </button>
                    </li>
                  </ul>
                </aside>
                <h2 :class="key <= 1 ? 'md:leading-tighter md:text-5xl': 'md:text-2xl'" class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl"><nuxt-link rel="bookmark" class="ltt-headline no-underline hover:underline focus:underline" :to="'/' + article.slug + '/'">{{ article.headline }}</nuxt-link></h2>
                <p :class="key <= 1 ? 'md:text-xl lg:text-xl highlight-first-line': ''" class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">{{ article.subHeadline }}</p>
                <aside role="complementary" class="w-full">
                  <h4 :id="'article-meta-title-' + key" class="sr-only no-print">Article information:</h4>
                  <ul role="list" :aria-labelledby="'article-meta-title-' + key" :class="key <= 1 ? 'text-base': 'text-sm'" class="ltt-text-gray font-serif font-light md:font-medium leading-loose pl-0 list-none">
                    <li class="pr-8 inline-block"><nuxt-link rel="author" class="ltt-text-red no-underline hover:underline focus:underline" :to="'/author/' + slugify(article.author) + '/'">{{ article.author }}</nuxt-link></li>
                    <li class="pr-8 inline-block"><time :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
                    <li class="inline-block" :aria-label="article.estimatedReadingTimeMinutes + ' minute read'">{{ article.estimatedReadingTimeMinutes }} min read</li>
                  </ul>
                </aside>
              </article>
            </div>
          </template>
          <template v-for="num in 7">
            <template v-if="latestEditorials.length < num">
              <div :class="'hidden md:block cell cell--' + (num - 1)"></div>
            </template>
          </template>
          <template v-if="displaySidebar">
            <div class="cell cell--7">
              <aside role="complementary" class="no-print">
                <h2 id="transport-experts" class="w-full mt-2 mb-8 text-left text-base font-serif text-gray-333">Transport Experts</h2>
                <ul role="list" aria-labelledby="transport-experts" class="list-none pl-0">
                  <li v-for="(author, key) in allAuthors" class="block my-6">
                    <div class="flex flex-row">
                      <div class="flex-basis-25">
                        <figure v-if="author.photo">
                          <img loading="lazy" class="notch-small max-w-full" width="100" height="100" :src="author.photo" :alt="author.name" :title="author.name" />
                        </figure>
                      </div>
                      <div class="flex-basis-75">
                        <div class="pl-4">
                          <h3 class="w-full font-sans text-left font-bold leading-tight text-xl md:text-sm"><nuxt-link class="ltt-headline no-underline hover:underline focus:underline" :to="'/author/' + slugify(author.name) + '/'">{{ author.name }}</nuxt-link></h3>
                          <h4 v-for="(article, index) in authorEditorials(author.name)" v-if="index < 1" class="w-full font-serif text-left font-normal leading-tight text-xl md:text-sm"><nuxt-link class="text-gray-333 no-underline hover:underline focus:underline" :to="'/' + article.slug + '/'">{{ article.headline }}</nuxt-link></h4>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </aside>
              <!--<aside role="complementary">
                <h2 id="featured-author" class="w-full mb-8 text-left text-base font-serif text-gray-333">Featured: <nuxt-link class="ltt-text-red no-underline hover:underline focus:underline" :to="'/author/' + slugify(settingsHome.featuredAuthor) + '/'">{{ settingsHome.featuredAuthor }}</nuxt-link></h2>
                <ul role="list" aria-labelledby="featured-author" class="list-none pl-0">
                  <li v-for="(article, key) in featuredAuthorEditorials" class="block line-after my-3">
                    <article role="article">
                      <h3 class="w-full my-4 font-sans text-left font-bold leading-tight text-xl md:text-sm"><nuxt-link class="ltt-headline no-underline hover:underline focus:underline" :to="'/' + article.slug + '/'">{{ article.headline }}</nuxt-link></h3>
                      <aside role="complementary" class="w-full">
                        <h4 :id="'featured-author-'+key" class="sr-only no-print">Article information:</h4>
                        <ul role="list" :aria-labelledby="'featured-author-'+key" class="ltt-text-gray font-serif font-light md:font-medium leading-loose text-sm pl-0 list-none">
                          <li class="pr-6 inline-block"><time :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
                          <li class="inline-block" :aria-label="article.estimatedReadingTimeMinutes + ' minute read'">{{ article.estimatedReadingTimeMinutes }} min read</li>
                        </ul>
                      </aside>
                    </article>
                  </li>
                </ul>
              </aside>-->
            </div>
          </template>
          <template v-else>
            <template v-for="(article, key) in latestEditorials" v-if="key >= 7 && key <= 9">
              <div :class="'cell cell--' + (key + 1)">
                <article role="article" class="article-item">
                  <aside role="complementary" class="w-full">
                    <h4 :id="'article-links-title-' + (key + 1)" class="sr-only no-print">Article Links:</h4>
                    <ul role="list" :aria-labelledby="'article-links-title-' + (key + 1)" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose text-base pl-0 list-none">
                      <li v-if="article.categories.length > 0" class="inline-block"><nuxt-link class="ltt-text-red no-underline hover:underline focus:underline" :to="'/category/' + slugify(article.categories[0]) + '/'">{{ article.categories[0] }}</nuxt-link></li>
                      <li class="inline-block no-print">
                        <button :title="bookmarked(article.md5) ? 'Remove bookmark': 'Bookmark article'" :class="bookmarked(article.md5) ? 'ani-sparkle-once': ''" class="focus-outline-none leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" @click="toggle(article.md5)">
                          <svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path :d="bookmarked(article.md5) ? 'M 17,3 H 7 C 5.9,3 5,3.9 5,5 v 16 l 7,-3 7,3 V 5 C 19,3.9 18.1,3 17,3 Z': 'M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z'" />
                          </svg>
                          <span v-if="bookmarked(article.md5)" class="sr-only">Remove bookmark for this article</span>
                          <span v-else class="sr-only">Bookmark this article</span>
                        </button>
                      </li>
                    </ul>
                  </aside>
                  <h2 :class="key <= 1 ? 'md:leading-tighter md:text-5xl': 'md:text-2xl'" class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl"><nuxt-link rel="bookmark" class="ltt-headline no-underline hover:underline focus:underline" :to="'/' + article.slug + '/'">{{ article.headline }}</nuxt-link></h2>
                  <p :class="key <= 1 ? 'md:text-xl lg:text-xl highlight-first-line': ''" class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">{{ article.subHeadline }}</p>
                  <aside role="complementary" class="w-full">
                    <h4 :id="'article-meta-title-' + (key + 1)" class="sr-only no-print">Article information:</h4>
                    <ul role="list" :aria-labelledby="'article-meta-title-' + (key + 1)" :class="key <= 1 ? 'text-base': 'text-sm'" class="ltt-text-gray font-serif font-light md:font-medium leading-loose pl-0 list-none">
                      <li class="pr-8 inline-block"><nuxt-link rel="author" class="ltt-text-red no-underline hover:underline focus:underline" :to="'/author/' + slugify(article.author) + '/'">{{ article.author }}</nuxt-link></li>
                      <li class="pr-8 inline-block"><time :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
                      <li class="inline-block" :aria-label="article.estimatedReadingTimeMinutes + ' minute read'">{{ article.estimatedReadingTimeMinutes }} min read</li>
                    </ul>
                  </aside>
                </article>
              </div>
            </template>
            <template v-for="num in 10">
              <template v-if="num >= 8">
                <template v-if="latestEditorials.length < num">
                  <div :class="'hidden md:block cell cell--' + num"></div>
                </template>
              </template>
            </template>
          </template>
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
      pageName: 'home'
      //latestEditorials: this.$store.getters['editorials/retrieveAllEditorials'],
      //settings: this.$store.getters['settings/retrieveSettings'](''),
      //featuredAuthorEditorials: this.$store.getters['editorials/retrieveAuthorEditorials']('Phil Goodwin')

      //this.$store.state.todos.list
      //structuredData: this.$store.state.event.structuredData
    }
  },

  /*mounted () {
    let juju = this.$slugify('works in mounted')
    console.log(juju)
  },*/

  components: {
    PageHeader
  },

  async fetch ({ store }) {
    //await store.dispatch('pages/retrievePages')
  },

  mounted() {
    if (this.$store.getters['settings/retrieveSetting']('home').featuredAuthor) {
      this.displaySidebar = true
    }

    this.updateBookmarkState()

    /*if (process.env.NODE_ENV !== 'production') {
      this.$cookies.set('bookmarks', '', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'Lax',
        httpOnly: false // Cookies created via JavaScript cannot include the 'HttpOnly' flag (only server-side languages)
      })
    }
    else {
      this.$cookies.set('bookmarks', 'juju-zippy', {
        path: '/',
        domain: `${pkg.homepageURL.replace('https://', '').replace('www.', '')}`,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'Lax',
        httpOnly: false, // Cookies created via JavaScript cannot include the 'HttpOnly' flag (only server-side languages)
        secure: true
      })
    }


    let cookieBookmarks = this.$cookies.get('bookmarks', { parseJSON: false })
    console.log(cookieBookmarks)*/
  },

  computed: {
    settingsHeader () {
      return this.$store.getters['settings/retrieveSetting']('header')
    },

    settingsHome () {
      return this.$store.getters['settings/retrieveSetting']('home')
    },

    latestEditorials () {
      return this.$store.getters['editorials/retrieveAllEditorials']
    },

    featuredAuthorEditorials () {
      return this.$store.getters['editorials/retrieveAuthorEditorials'](this.settingsHome.featuredAuthor)
    },

    allAuthors () {
      let authorList = [...this.$store.state.authors.authors]
      return authorList.sort(function() { return 0.5 - Math.random() })
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

    authorEditorials (author) {
      return this.$store.getters['editorials/retrieveAuthorEditorials'](author)
    },

    ...mapMutations({
      toggle: 'bookmarks/TOGGLE_BOOKMARK',
      updateBookmarkState: 'bookmarks/UPDATE_BOOKMARKS'
    })

    /*slugify(string) {
      const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
      const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
      const p = new RegExp(a.split('').join('|'), 'g')

      return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    }*/
  },

  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        //{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
        //{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }
        //{ src: 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js' }
      ],
      title: pkg.description,
      /*title: 'Local Transport Today - Transport Policy, Planning, Finance, Development',
      meta: [
        { hid: 'description', name: 'description', content: 'Local Transport Today' }
      ],*/
      link: [
        { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL }
      ]
    }
  }
}

if (process.client) { // Nuxt requires this otherwise 'window.' or 'document.' will be undefined
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on('init', user => {
      if (!user) {
        window.netlifyIdentity.on('login', () => {
          document.location.href = '/admin/'
        })
      }
    })
  }
}
</script>
