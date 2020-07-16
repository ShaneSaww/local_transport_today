<template>
  <div>
    <page-header :displayHero="displayHero" :settingsHeader="settingsHeader" :pageName="pageName" />
    <h1 class="sr-only"><nuxt-link to="/author/">Authors - Local Transport Today Discussion</nuxt-link></h1>
    <div role="main" id="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-6">
      <section class="w-full mt-10 ltt-bg-dark-gray p-6 no-print">
        <!-- <h2 id="author-index" class="sr-only">Authors</h2> -->
        <h2 id="author-index" class="font-sans text-white text-xl leading-none pb-4 sm:pb-2">Meet our Authors</h2>
        <ul role="list" aria-labelledby="author-index" class="pl-0 font-sans list-none sm:column-width-44 column-gap-8 column-rule-white-03">
          <li v-for="(author, index) in allAuthors" class="py-4 sm:py-1"><nuxt-link v-scroll-to="{ el: '#author-' + author.slug, offset: -50, duration: 1000 }" :to="'#author-' + author.slug" class="text-white text-base leading-normal no-underline hover:underline focus:underline">{{ author.name }}</nuxt-link></li>
        </ul>
      </section>
      <div class="alternate-sections w-full">
        <section v-for="(author, index) in allAuthors" :id="'author-' + author.slug" class="p-6 lg:p-4 print:px-0">
          <div class="newspaper-category">
            <div :class="'cell cell--0'">
              <h2 class="w-full text-left text-base leading-tight font-sans ltt-headline mb-8"><nuxt-link class="red-block inline-block" :to="'/author/' + author.slug + '/'">{{ author.name }}</nuxt-link></h2>
              <div class="block h-full">
                <figure v-if="author.photo" class="sm:w-32 sm:float-left mb-4 sm:mr-4 sm:mb-2">
                  <img loading="lazy" class="notch sm:notch-small max-w-full" width="310" height="310" :src="author.photo" :alt="author.name" :title="author.name" />
                </figure>
                <p class="w-full font-serif md:text-base lg:text-base highlight-first-line mb-4 text-left text-gray-333 leading-normal text-sm">{{ author.bio }}</p>
                <h4 v-if="author.email || author.twitter || author.linkedin" :id="'author-social-media-title-' + index" class="sr-only no-print">Contact {{ author.name }}:</h4>
                <ul role="list" v-if="author.email || author.twitter || author.linkedin" :aria-labelledby="'author-social-media-title-' + index" class="w-full no-print pl-0 pt-4 list-none inline-block">
                  <li v-if="author.email" class="block sm:inline-block mb-2 mr-6">
                    <a :href="'mailto:' + author.email" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 229.66 229.66" xmlns="http://www.w3.org/2000/svg"><g transform="translate(288.87 -28.254)"><path d="m-272.85 223.12c-7.2498-1.0772-13.345-6.668-15.407-14.132-0.58413-2.1145-0.62245-6.1736-0.62245-65.93 0-59.756 0.0383-63.815 0.62245-65.93 1.7586-6.3659 6.1622-11.131 12.394-13.411l2.5054-0.91663h99.131c95.225 0 99.213 0.0255 101.23 0.64847 6.2047 1.9145 10.844 6.3943 12.958 12.514l0.81552 2.3602v64.735c0 62.538-0.0226 64.801-0.66614 66.675-1.1473 3.3418-2.2684 5.2105-4.6238 7.7074-2.3674 2.5095-4.8337 4.0632-8.292 5.2235-1.8662 0.62615-5.6859 0.65284-100.01 0.69895-53.94 0.0264-98.955-0.0833-100.03-0.24362zm190.07-13.614c0.19708-0.59124-59.382-55.158-60.225-55.158-0.38921 0-2.9064 2.0073-5.7798 4.6091-6.1944 5.6087-8.1328 7.0839-11.33 8.6224-4.1295 1.9872-7.1915 2.6937-12.524 2.8894-5.9672 0.21905-10.066-0.53215-14.666-2.6876-3.7642-1.764-5.2439-2.8654-11.616-8.6466-2.7164-2.4645-5.2149-4.6337-5.5522-4.8205-0.49798-0.2757-1.2607 0.24913-4.0569 2.7916-26.314 23.925-56.385 51.778-56.473 52.307-0.11093 0.66408 1.4133 0.67391 90.987 0.58653 68.112-0.0665 91.134-0.19093 91.235-0.49334zm-161.92-37.516c16.254-15.132 29.599-27.803 29.657-28.157 0.12807-0.79099-58.526-54.08-59.791-54.322l-0.81453-0.1557v55.074c0 54.648 5e-3 55.074 0.69829 55.074 0.43728 0 11.744-10.284 30.251-27.514zm172.38 26.72c0.28114-1.0491 0.27639-107.45-5e-3 -108.5-0.14339-0.53533-0.43734-0.77588-0.8622-0.70556-0.35454 0.0587-13.55 11.805-29.323 26.103-33.573 30.434-30.688 27.762-30.529 28.275 0.23528 0.7557 59.346 55.611 59.93 55.615 0.31691 2e-3 0.67194-0.35334 0.78893-0.78991zm-98.203-43.061c2.2997-0.9474 5.4392-3.0314 8.5776-5.694 6.7422-5.7198 79.458-72.667 79.553-73.242 0.11114-0.67151-1.1783-0.68112-91.437-0.68112-60.495 0-91.623 0.11936-91.767 0.35187-0.11961 0.19353 0.46633 1.0525 1.3021 1.9088 1.2132 1.243 64.175 58.91 75.684 69.319 6.3648 5.7566 11.472 8.8615 14.549 8.8454 0.87859-5e-3 2.4706-0.36806 3.5377-0.80769z"/></g></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Email</span></a>
                  </li>
                  <li v-if="author.twitter" class="block sm:inline-block mb-2 mr-6">
                    <a :href="author.twitter" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Twitter</span></a>
                  </li>
                  <!-- <li v-if="author.linkedin" class="block sm:inline-block mb-2 mr-6">
                    <a :href="author.linkedin" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">LinkedIn</span></a>
                  </li> -->
                </ul>
              </div>
            </div>
            <template v-for="(article, key) in authorEditorials(author.name)" v-if="key <= 5">
              <div :class="'cell cell--' + (key + 1)">
                <article v-if="key <= 4" role="article" class="article-item">
                  <h3 class="w-full mb-4 font-sans text-left font-extrabold leading-tight text-2xl md:text-base"><nuxt-link rel="bookmark" class="ltt-headline no-underline hover:underline focus:underline" :to="'/' + article.slug + '/'">{{ article.headline }}</nuxt-link></h3>
                  <p v-if="key <= 1" class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-sm">{{ article.subHeadline }}</p>
                  <aside role="complementary" class="w-full">
                    <h4 :id="'author-meta-title-' + index + '-' + (key + 1)" class="sr-only no-print">Article information:</h4>
                    <ul role="list" :aria-labelledby="'author-meta-title-' + index + '-' + (key + 1)" class="ltt-text-gray font-serif font-light text-sm md:font-medium leading-loose pl-0 list-none">
                      <li class="pr-8 inline-block"><nuxt-link rel="author" class="ltt-text-red no-underline hover:underline focus:underline" :to="'/author/' + slugify(article.author) + '/'">{{ article.author }}</nuxt-link></li>
                      <li v-if="key <= 1" class="pr-8 inline-block"><time :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
                      <!--<li class="inline-block" :aria-label="article.estimatedReadingTimeMinutes + ' minute read'">{{ article.estimatedReadingTimeMinutes }} min read</li>-->
                    </ul>
                  </aside>
                </article>
                <span v-if="key === 5" class="w-full text-left text-base font-bold leading-none font-sans ltt-headline mb-8"><nuxt-link class="red-block inline-block" :to="'/author/' + author.slug + '/'">Read more Contributions<br /><span class="text-white opacity-75 text-xs">from {{ author.name }}</span></nuxt-link></span>
              </div>
            </template>
            <template v-for="num in 6">
              <template v-if="authorEditorials(author.name).length < num">
                <div :class="'hidden md:block cell cell--' + num"></div>
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

    allAuthors () {
      //let authorList = [...this.$store.state.authors.authors]
      //return authorList.sort(function() { return 0.5 - Math.random() }) // randomise author list
      return this.$store.state.authors.authors
    },

    // allCategories () {
    //   return this.$store.state.categories.categories
    // },

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

    authorEditorials (author) {
      return this.$store.getters['editorials/retrieveAuthorEditorials'](author)
    },

    // categoryEditorials (category) {
    //   return this.$store.getters['editorials/retrieveCategoryEditorials'](category)
    // }
  },

  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        //{ innerHTML: JSON.stringify(structuredData), type: 'application/ld+json' }
      ],
      title: 'Authors - ' + pkg.description,
      link: [
        { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL + '/author/' }
      ]
    }
  }
}
</script>
