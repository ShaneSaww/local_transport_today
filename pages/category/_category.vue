<template>
  <div>
    <page-header :displayHero="displayHero" :settingsHeader="settingsHeader" :pageName="categorySlug" />
    <h1 class="sr-only"><nuxt-link :to="'/category/' + categorySlug + '/'">{{ category.name }} - Local Transport Today Discussion</nuxt-link></h1>
    <div role="main" id="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
      <div class="w-full mt-10 mx-6 lg:mx-4 print:mx-0">
        <div :class="categoryEditorials.length > 5 ? 'newspaper': 'newspaper-truncated'">
          <template v-for="(article, key) in categoryEditorials" v-if="key <= 6">
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
            <template v-if="categoryEditorials.length < num">
              <div :class="'hidden md:block cell cell--' + (num - 1)"></div>
            </template>
          </template>
          <template v-if="displaySidebar">
            <div class="cell cell--7">
              <aside role="complementary">
                <!--<h2 id="featured-author" class="w-full mb-8 text-left text-base font-serif text-gray-333">Featured: <a class="ltt-text-red no-underline hover:underline focus:underline" :href="'/author/' + slugify(settingsHome.featuredAuthor)">{{ settingsHome.featuredAuthor }}</a></h2>
                <ul role="list" aria-labelledby="featured-author" class="list-none pl-0">
                  <li v-for="(article, key) in featuredAuthorEditorials" class="block line-after my-3">
                    <article role="article">
                      <h3 class="w-full my-4 font-sans text-left font-bold leading-tight text-xl md:text-sm"><a class="ltt-headline no-underline hover:underline focus:underline" :href="'/'+article.slug">{{ article.headline }}</a></h3>
                      <aside role="complementary" class="w-full">
                        <h4 :id="'featured-author-'+key" class="sr-only no-print">Article information:</h4>
                        <ul role="list" :aria-labelledby="'featured-author-'+key" class="ltt-text-gray font-serif font-light md:font-medium leading-loose text-sm pl-0 list-none">
                          <li class="pr-6 inline-block"><time :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
                          <li class="inline-block" :aria-label="article.estimatedReadingTimeMinutes + ' minute read'">{{ article.estimatedReadingTimeMinutes }} min read</li>
                        </ul>
                      </aside>
                    </article>
                  </li>
                </ul>-->
              </aside>
            </div>
          </template>
          <template v-else>
            <template v-for="(article, key) in categoryEditorials" v-if="key >= 7 && key <= 9">
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
                <template v-if="categoryEditorials.length < num">
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
      //category: {},
      categorySlug: this.$route.params.category
    }
  },

  components: {
    PageHeader
  },

  async asyncData({ params, payload }) {
    if (payload) {
      return {
        category: payload
      }
    }
    else {
      return {
        category: await require(`~/assets/content/categories/${params.category}.json`)
      }
    }
  },

  mounted() {
    //this.category = this.$store.getters['categories/retrieveCategory'](this.categorySlug)

    this.updateBookmarkState()
  },

  computed: {
    settingsHeader () {
      return this.$store.getters['settings/retrieveSetting']('header')
    },

    categoryEditorials () {
      return this.$store.getters['editorials/retrieveCategoryEditorials'](this.category.name)
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

    ...mapMutations({
      toggle: 'bookmarks/TOGGLE_BOOKMARK',
      updateBookmarkState: 'bookmarks/UPDATE_BOOKMARKS'
    })
  },

  head() {

    let structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Categories",
        "item": pkg.homepageURL + '/category/'
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": this.category.name,
        "item": pkg.homepageURL + '/category/' + this.categorySlug + '/'
      }]
    }

    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(structuredData), type: 'application/ld+json' }
      ],
      title: this.category.name + ' - ' + pkg.description,
      meta: [
        { hid: 'og-title', property: 'og:title', content: this.category.name + ' - ' + pkg.description },
        { hid: 'twitter-title', name: 'twitter:title', content: this.category.name + ' - ' + pkg.description },
        { hid: 'keywords', name: 'keywords', content: this.category.name }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL + '/category/' + this.categorySlug + '/' }
      ]
    }
  }
}
</script>
