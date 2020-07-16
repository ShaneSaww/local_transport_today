<template>
  <div>
    <page-header :displayHero="displayHero" :settingsHeader="settingsHeader" :pageName="pageName" />
    <h1 class="sr-only"><nuxt-link to="/category/">Subjects - Local Transport Today Discussion</nuxt-link></h1>
    <div role="main" id="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-6">
      <section class="w-full mt-10 ltt-bg-dark-gray p-6 no-print">
        <!-- <h2 id="category-index" class="sr-only">Subjects</h2> -->
        <h2 id="author-index" aria-label="A to Z of Subjects" class="font-sans text-white text-xl leading-none pb-4 sm:pb-2">A-Z of Subjects</h2>
        <ul role="list" aria-labelledby="category-index" class="pl-0 font-sans list-none sm:column-width-44 column-gap-8 column-rule-white-03">
          <li v-for="(category, index) in allCategories" class="py-4 sm:py-1"><nuxt-link v-scroll-to="{ el: '#category-' + category.slug, offset: -50, duration: 1000 }" :to="'#category-' + category.slug" class="text-white text-base leading-normal no-underline hover:underline focus:underline">{{ category.name }}</nuxt-link></li>
        </ul>
      </section>
      <div class="alternate-sections w-full">
        <section v-for="(category, index) in allCategories" :id="'category-' + category.slug" class="p-6 lg:p-4 print:px-0">
          <div class="newspaper-category">
            <template v-for="(article, key) in categoryEditorials(category.name)" v-if="key <= 6">
              <div :class="'cell cell--' + key">
                <h2 v-if="key === 0" class="w-full text-left text-base leading-tight font-sans ltt-headline mb-8"><nuxt-link class="red-block inline-block" :to="'/category/' + category.slug + '/'">{{ category.name }}</nuxt-link></h2>
                <article v-if="key <= 5" role="article" class="article-item">
                  <h3 :class="key <= 0 ? 'md:leading-tighter md:text-2xl': 'md:text-base'" class="w-full mb-4 font-sans text-left font-extrabold leading-tight text-2xl"><nuxt-link rel="bookmark" class="ltt-headline no-underline hover:underline focus:underline" :to="'/' + article.slug + '/'">{{ article.headline }}</nuxt-link></h3>
                  <p v-if="key <= 2" :class="key <= 0 ? 'md:text-base lg:text-base highlight-first-line': ''" class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-sm">{{ article.subHeadline }}</p>
                  <aside role="complementary" class="w-full">
                    <h4 :id="'category-meta-title-' + index + '-' + key" class="sr-only no-print">Article information:</h4>
                    <ul role="list" :aria-labelledby="'category-meta-title-' + index + '-' + key" :class="key <= 0 ? 'text-base': 'text-sm'" class="ltt-text-gray font-serif font-light md:font-medium leading-loose pl-0 list-none">
                      <li class="pr-8 inline-block"><nuxt-link rel="author" class="ltt-text-red no-underline hover:underline focus:underline" :to="'/author/' + slugify(article.author) + '/'">{{ article.author }}</nuxt-link></li>
                      <li v-if="key <= 2" class="pr-8 inline-block"><time :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
                      <!--<li class="inline-block" :aria-label="article.estimatedReadingTimeMinutes + ' minute read'">{{ article.estimatedReadingTimeMinutes }} min read</li>-->
                    </ul>
                  </aside>
                </article>
                <span v-if="key === 6" class="w-full text-left text-base font-bold leading-none font-sans ltt-headline mb-8"><nuxt-link class="red-block inline-block" :to="'/category/' + category.slug + '/'">Read more Discussions<br /><span class="text-white opacity-75 text-xs">about {{ category.name }}</span></nuxt-link></span>
              </div>
            </template>
            <template v-for="num in 7">
              <template v-if="categoryEditorials(category.name).length < num">
                <div :class="'hidden md:block cell cell--' + (num - 1)"></div>
              </template>
            </template>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import dayjs from 'dayjs'
import helperSlugify from '~/assets/js/slugify.js'
import pkg from '~/package'

export default {
  data: function () {
    return {
      displayHero: true,
      pageName: 'categories'
    }
  },

  components: {
    PageHeader
  },

  async fetch ({ store }) {
    //await store.dispatch('pages/retrievePages')
  },

  mounted() {

  },

  computed: {
    settingsHeader () {
      return this.$store.getters['settings/retrieveSetting']('header')
    },

    // latestEditorials () {
    //   return this.$store.getters['editorials/retrieveAllEditorials']
    // },

    // featuredAuthorEditorials () {
    //   return this.$store.getters['editorials/retrieveAuthorEditorials'](this.settingsHome.featuredAuthor)
    // },
    //
    // allAuthors () {
    //   let authorList = [...this.$store.state.authors.authors]
    //   return authorList.sort(function() { return 0.5 - Math.random() }) // randomise author list
    // },

    allCategories () {
      return this.$store.state.categories.categories
    },

    // bookmarkedEditorials () {
    //   let bookmarks = this.allBookmarks()
    //   return this.$store.getters['editorials/retrieveBookmarkedEditorials'](bookmarks)
    // }
  },

  methods: {
    dayjsNuxt (timestamp, format) {
      return dayjs(String(timestamp)).format(String(format))
    },

    slugify (string) {
      return helperSlugify.slugify(string)
    },

    // bookmarked (articleMd5) {
    //   return this.$store.getters['bookmarks/checkBookmark'](articleMd5)
    // },
    //
    // allBookmarks () {
    //   return this.$store.getters['bookmarks/retrieveBookmarks']
    // },

    // authorEditorials (author) {
    //   return this.$store.getters['editorials/retrieveAuthorEditorials'](author)
    // },

    categoryEditorials (category) {
      return this.$store.getters['editorials/retrieveCategoryEditorials'](category)
    }
  },

  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        //{ innerHTML: JSON.stringify(structuredData), type: 'application/ld+json' }
      ],
      title: 'Subjects - ' + pkg.description,
      link: [
        { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL + '/category/' }
      ]
    }
  }
}
</script>
