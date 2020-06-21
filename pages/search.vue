<template>
  <div>
    <page-header :displayHero="displayHero" :settingsHeader="settingsHeader" :pageName="pageName" />
    <div role="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
      <div class="w-full mt-10 mx-6 lg:mx-4 max-w-sm md:max-w-lg">
        <h1 class="font-sans font-extrabold text-left leading-tight md:leading-tighter ltt-text-red my-4 text-4xl md:text-6xl lg:mt-0">Search</h1>
        <p v-if="searchTerm" class="font-serif text-left text-gray-333 leading-normal text-base md:text-xl lg:text-2xl">You searched for “{{ searchTerm }}”.</p>
        <p v-else class="mt-8 italic font-serif text-left text-gray-333 leading-normal text-base md:text-xl lg:text-2xl">No results found.</p>
        <template v-for="(article, key) in searchResults">
          <article v-if="article.description !== siteDescription" role="article" class="mt-8">
            <h2 class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl md:text-2xl">
              <nuxt-link :to="article.path.replace('index.html', '')" class="ltt-headline no-underline hover:underline focus:underline">
                <span v-if="article.from[0] === 'category'" class="text-gray-333">Category: </span>
                <span v-else-if="article.from[0] === 'author'" class="text-gray-333">Contributor: </span>
                {{ article.title.replace(' - ' + pkgDescription, '') }}</nuxt-link></h2>
            <p class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">{{ article.description }}</p>
          </article>
        </template>
        <p v-if="searchResults && searchResults.length === 0" class="mt-8 italic font-serif text-left text-gray-333 leading-normal text-base md:text-xl lg:text-2xl">No results found.</p>
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
      displaySidebar: false,
      pageName: 'search',
      searchTerm: this.$route.query.search,
      pkgDescription: pkg.description,
      siteDescription: pkg.siteDescription,
      searchResults: []
    }
  },

  watchQuery: ['search'],

  components: {
    PageHeader
  },

  mounted() {
    this.fetchSearchResults()
    //this.$route.query.juju = 'go'

    /*let searchData

    if(this.$route.query.search) {
      if (process.env.NODE_ENV !== 'production') { // this allows for testing via localhost
        searchData = fetch(`${pkg.homepageURL}/.netlify/functions/search/?search=${this.$route.query.search}`).then(x => x.json())
      }
      else {
        searchData = fetch(`/.netlify/functions/search/?search=${this.$route.query.search}`).then(x => x.json())
      }
    }

    this.searchResults = searchData*/
  },

  computed: {
    settingsHeader () {
      return this.$store.getters['settings/retrieveSetting']('header')
    }
  },

  /*async asyncData({ route }) {

    let searchData

    if(route.query.search) {
      if (process.env.NODE_ENV !== 'production') { // this allows for testing via localhost
        searchData = await fetch(`${pkg.homepageURL}/.netlify/functions/search/?search=${route.query.search}`).then(x => x.json())
      }
      else {
        searchData = await fetch(`/.netlify/functions/search/?search=${route.query.search}`).then(x => x.json())
      }
    }

    return {
      searchResults: searchData
    }
  },*/

  methods: {
    dayjsNuxt (timestamp, format) {
      return dayjs(String(timestamp)).format(String(format))
    },

    slugify (string) {
      return helperSlugify.slugify(string)
    },

    async fetchSearchResults() {

      let searchData

      if(this.$route.query.search) {
        if (process.env.NODE_ENV !== 'production') { // this allows for testing via localhost
          searchData = await this.$axios.$get(`${pkg.homepageURL}/.netlify/functions/search/?search=${this.$route.query.search}`).then(x => x.json())
        }
        else {
          searchData = await this.$axios.$get(`/.netlify/functions/search/?search=${this.$route.query.search}`).then(x => x.json())
        }
      }

      this.searchResults = searchData
    }
  },

  head() {
    return {
      //__dangerouslyDisableSanitizers: ['script'],
      title: 'Search - ' + pkg.description,
      meta: [
        { hid: 'robots', name: 'robots', content: "noindex,follow" }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL + '/search/' }
      ]
    }
  }
}
</script>
