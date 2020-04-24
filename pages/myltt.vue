<template>
  <div>
    <page-header :displayHero="displayHero" :settingsHeader="settingsHeader" />
    <h1 class="sr-only"><nuxt-link exact to="/">Local Transport Today Discussion</nuxt-link></h1>
    <div role="main" id="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
      <div role="article" class="mt-10 mx-6 lg:mx-4 max-w-sm md:max-w-lg">
        <h1 class="font-sans font-extrabold leading-tight md:leading-tighter ltt-text-red mb-4 text-4xl md:text-6xl lg:mt-0"><span class="font-serif italic opacity-75">my</span>LTT</h1>
        <template v-for="(article, key) in allBookmarks">
          <!--

          https://vuejs.org/v2/guide/transitions.html

          <article role="article" itemscope itemtype="https://schema.org/Article" class="article-item">
            <aside role="complementary" class="w-full">
              <h4 :id="'article-links-title-' + key" class="sr-only no-print">Article Links:</h4>
              <ul :aria-labelledby="'article-links-title-' + key" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                <li v-if="article.categories.length > 0" class="inline-block"><nuxt-link class="ltt-text-red no-underline hover:underline focus:underline" :to="'/category/' + slugify(article.categories[0])">{{ article.categories[0] }}</nuxt-link></li>
                <li class="inline-block no-print">
                  <button :title="bookmarked(article.md5) ? 'Remove bookmark': 'Bookmark article'" :class="bookmarked(article.md5) ? 'ani-sparkle-once': ''" class="focus-outline-none leading-none text-sm no-underline ltt-text-pink-50 hover:ltt-text-pink focus:ltt-text-pink" @click="toggle(article.md5)">
                    <svg aria-hidden="true" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path :d="bookmarked(article.md5) ? 'M 17,3 H 7 C 5.9,3 5,3.9 5,5 v 16 l 7,-3 7,3 V 5 C 19,3.9 18.1,3 17,3 Z': 'M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z'" />
                    </svg>
                    <span v-if="bookmarked(article.md5)" class="sr-only">Remove bookmark for this article</span>
                    <span v-else class="sr-only">Bookmark this article</span>
                  </button>
                </li>
              </ul>
            </aside>
            <h2 itemprop="headline" :class="key <= 1 ? 'md:leading-tighter md:text-5xl': 'md:text-2xl'" class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl"><nuxt-link rel="bookmark" class="ltt-text-red no-underline hover:underline focus:underline" :to="'/'+article.slug">{{ article.headline }}</nuxt-link></h2>
            <p itemprop="subheading" :class="key <= 1 ? 'md:text-xl lg:text-xl highlight-first-line': ''" class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">{{ article.subHeadline }}</p>
            <aside role="complementary" class="w-full">
              <h4 :id="'article-meta-title-' + key" class="sr-only no-print">Article information:</h4>
              <ul :aria-labelledby="'article-meta-title-' + key" :class="key <= 1 ? 'text-base': 'text-sm'" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal pl-0 list-none">
                <li class="pr-8 inline-block"><nuxt-link rel="author" itemprop="author" class="ltt-text-red no-underline hover:underline focus:underline" :to="'/author/' + slugify(article.author)">{{ article.author }}</nuxt-link></li>
                <li class="pr-8 inline-block"><time itemprop="dateCreated pubdate datePublished" :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
                <li class="inline-block" :aria-label="article.estimatedReadingTimeMinutes + ' minute read'">{{ article.estimatedReadingTimeMinutes }} min read</li>
              </ul>
            </aside>
          </article>-->
        </template>
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
      displaySidebar: false
    }
  },

  components: {
    PageHeader
  },

  mounted() {
    this.updateBookmarkState()
  },

  computed: {
    settingsHeader () {
      return this.$store.getters['settings/retrieveSetting']('header')
    },

    allBookmarks () {
      return this.$store.getters['bookmarks/retrieveBookmarks']
    },

    /*retrieveBookmarkedEditorials () {
      let bookmarks = this.allBookmarks()
      return this.$store.getters['editorials/retrieveBookmarkedEditorials'](bookmarks)
    }*/
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

    ...mapMutations({
      toggle: 'bookmarks/TOGGLE_BOOKMARK',
      updateBookmarkState: 'bookmarks/UPDATE_BOOKMARKS'
    })
  },

  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        //{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
        //{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }
        //{ src: 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js' }
      ],
      title: 'myLTT - ' + pkg.description,
      /*title: 'Local Transport Today - Transport Policy, Planning, Finance, Development',
      meta: [
        { hid: 'description', name: 'description', content: 'Local Transport Today' }
      ],*/
      link: [
        { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL + '/myltt' }
      ]
    }
  }
}
</script>
