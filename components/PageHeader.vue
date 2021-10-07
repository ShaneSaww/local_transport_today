<template>
  <header id="header" role="banner" class="w-full ltt-header fixed top-0 left-0 right-0 z-50">
    <nav role="navigation" class="w-full flex flex-col lg:flex-row lg:justify-between font-sans block text-sm px-6 py-3 leading-normal md:leading-none">
      <div class="flex flex-row justify-between">
        <div class="block self-center">
          <h1><nuxt-link exact to="/" class="font-sans ltt-text-red no-underline tracking-wide hover:underline focus:underline">LTT<span class="ltt-text-gray font-serif italic tracking-normal"> Discussion</span></nuxt-link></h1>
        </div>
        <h2 id="header-nav-title" class="sr-only">Site navigation</h2>
        <div class="block lg:hidden">
          <button @click="toggleHamburger" class="flex items-center px-3 py-2 border-2 rounded text-gray-333">
            <svg :class="open ? 'hidden': 'block'" class="fill-current h-5 w-5" viewBox="0 0 18.969 15" xmlns="http://www.w3.org/2000/svg">
              <title>Open Menu</title>
              <path d="m 18.945,1.25 c 0,0.69 -0.5,1.25 -1.117,1.25 H 1.141 C 0.524,2.5 0.023,1.94 0.023,1.25 v 0 C 0.023,0.56 0.523,0 1.141,0 h 16.688 c 0.616,0 1.116,0.56 1.116,1.25 z" />
              <path d="m 18.923,7.5 c 0,0.689 -0.501,1.25 -1.118,1.25 H 1.118 C 0.5,8.75 0,8.189 0,7.5 v 0 C 0,6.811 0.5,6.25 1.118,6.25 h 16.687 c 0.617,0 1.118,0.561 1.118,1.25 z" />
              <path d="m 18.969,13.75 c 0,0.689 -0.5,1.25 -1.117,1.25 H 1.164 C 0.547,15 0.046,14.439 0.046,13.75 v 0 c 0,-0.689 0.5,-1.25 1.118,-1.25 h 16.688 c 0.617,0 1.117,0.561 1.117,1.25 z" />
            </svg>
            <svg :class="open ? 'block': 'hidden'" class="fill-current h-5 w-5" viewBox="0 0 15.789 15.797" xmlns="http://www.w3.org/2000/svg">
              <title>Close Menu</title>
              <path d="m 15.6105,13.277 -5.395,-5.415 5.407,-5.345 c 0.222,-0.222 0.222,-0.584 0,-0.806 L 14.0845,0.165 C 13.9785,0.058 13.8335,0 13.6815,0 c -0.152,0 -0.295,0.062 -0.402,0.165 L 7.8975,5.493 2.5075,0.168 C 2.4005,0.062 2.2565,0.003 2.1045,0.003 c -0.152,0 -0.296,0.062 -0.403,0.165 l -1.535,1.547 c -0.222,0.222 -0.222,0.584 0,0.806 l 5.407,5.346 -5.391,5.41 c -0.107,0.107 -0.168,0.251 -0.168,0.403 0,0.152 0.057,0.296 0.168,0.403 l 1.538,1.546 c 0.111,0.11 0.255,0.168 0.403,0.168 0.144,0 0.292,-0.054 0.403,-0.168 l 5.37,-5.396 5.374,5.391 c 0.111,0.111 0.255,0.169 0.402,0.169 0.145,0 0.293,-0.054 0.402,-0.169 l 1.539,-1.546 c 0.106,-0.106 0.168,-0.25 0.168,-0.402 -0.002,-0.148 -0.065,-0.292 -0.171,-0.399 z" />
            </svg>
          </button>
        </div>
      </div>
      <div id="menu" :class="open ? 'block': 'hidden'" class="w-full block flex-grow lg:flex lg:w-auto">
        <ul role="list" aria-labelledby="header-nav-title" class="menu-header w-full px-3 lg:px-0 lg:flex lg:justify-end lg:items-center list-none text-sm">
          <!--<li class="my-6 lg:my-2 lg:mx-4"><nuxt-link exact to="/" :aria-current="pageName === 'home' ? 'page' : undefined">Home</nuxt-link></li>-->
          <!-- <li v-if="settingsHeader.category1" class="my-6 lg:my-2 lg:mr-4"><nuxt-link :to="'/category/' + slugify(settingsHeader.category1) + '/'" :aria-current="pageName === slugify(settingsHeader.category1) ? 'page' : undefined">{{ settingsHeader.category1 }}</nuxt-link></li> -->
          <!-- <li v-if="settingsHeader.category2" class="my-6 lg:my-2 lg:mr-4"><nuxt-link :to="'/category/' + slugify(settingsHeader.category2) + '/'" :aria-current="pageName === slugify(settingsHeader.category1) ? 'page' : undefined">{{ settingsHeader.category2 }}</nuxt-link></li> -->
          <!-- <li v-if="settingsHeader.category3" class="my-6 lg:my-2 lg:mr-4"><nuxt-link :to="'/category/' + slugify(settingsHeader.category3) + '/'" :aria-current="pageName === slugify(settingsHeader.category1) ? 'page' : undefined">{{ settingsHeader.category3 }}</nuxt-link></li> -->
          <!--<li v-if="settingsHeader.category4" class="my-6 lg:my-2 lg:mr-4"><nuxt-link :to="'/category/' + slugify(settingsHeader.category4) + '/'" :aria-current="pageName === slugify(settingsHeader.category1) ? 'page' : undefined">{{ settingsHeader.category4 }}</nuxt-link></li>-->
          <!-- <li class="my-6 lg:my-2 lg:mr-6"><nuxt-link to="/about/" :aria-current="pageName === 'about' ? 'page' : undefined">About</nuxt-link></li> -->
          <!-- <li class="my-6 lg:my-2 lg:mr-6"><nuxt-link to="/contribute/" :aria-current="pageName === 'contribute' ? 'page' : undefined">Contribute</nuxt-link></li> -->
          <li class="my-6 lg:my-2 lg:mr-6"><nuxt-link to="/about/" :aria-current="pageName === 'about' ? 'page' : undefined">About</nuxt-link></li>
          <li class="my-6 lg:my-2 lg:mr-6"><nuxt-link to="/category/" :aria-current="pageName === 'categories' ? 'page' : undefined">Subjects</nuxt-link></li>
          <li class="my-6 lg:my-2 lg:mr-6"><nuxt-link to="/author/" :aria-current="pageName === 'authors' ? 'page' : undefined">Authors</nuxt-link></li>
          <li class="my-6 lg:my-2 lg:mr-6"><nuxt-link to="/settings/" :aria-current="pageName === 'settings' ? 'page' : undefined">Settings</nuxt-link></li>
          <!-- <li class="my-6 lg:my-2 lg:mr-6"><nuxt-link to="/myltt/" :aria-current="pageName === 'myltt' ? 'page' : undefined"><span class="font-serif italic opacity-75">my</span>LTT</nuxt-link></li> -->
        </ul>
        <div class="relative mb-4 lg:mb-0">
          <form role="search" method="get" action="/search/">
            <!-- <datalist id="search_list">
              <template v-for="(suggestion, key) in searchDataList">
                <option :value="suggestion.name">{{ suggestion.name }}</option>
              </template>
						</datalist> -->
            <label for="search" class="sr-only">Search</label>
            <!-- <input type="search" class="w-full lg:w-auto font-sans border ltt-headline h-10 px-5 pr-12 rounded-lg text-base md:text-sm focus:outline-none" list="search_list" name="search" id="search" placeholder="Search" :value="searchTerm" autocomplete="off" aria-required="true" required> -->
            <input type="search" class="w-full lg:w-auto font-sans border ltt-headline h-10 px-5 pr-12 rounded-lg text-base md:text-sm focus:outline-none" name="search" id="search" placeholder="Search" :value="searchTerm" autocomplete="off" aria-required="true" required />
            <input type="submit" value="Submit" name="Submit" class="sr-only" />
            <button aria-hidden="true" type="submit" class="absolute right-0 top-0 mt-3 mr-4">
              <svg focusable="false" class="ltt-headline h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                width="512px" height="512px">
                <path
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>

import helperSlugify from '~/assets/js/slugify.js'

export default {
  data: function () {
    return {
      open: false,
      searchTerm: this.$route.query.search
      //googleAnalyticsDisableToggle: this.toggleGoogleAnalytics()
    }
  },

  props: {
    displayHero: {
      type: Boolean,
      required: false,
      default: false
    },
    pageName: {
      type: String,
      required: false,
      default: false
    },
    /*settingsHeader: {
      type: Object,
      required: false,
      default: {
        category1: null,
        category2: null,
        category3: null,
        category4: null
      }
    }*/
  },

  computed: {
    // searchDataList () {
    //   let allAuthors = this.$store.state.authors.authors
    //   let allCategories = this.$store.state.categories.categories
    //
    //   let authorNames = allAuthors.map(key => {
    //     return {
    //       name: key.name
    //     }
    //   })
    //
    //   let categoryNames = allCategories.map(key => {
    //     return {
    //       name: key.name
    //     }
    //   })
    //
    //   let dataList = authorNames.concat(categoryNames)
    //
    //   dataList.sort(function (a, b) {
    //     if (a.name < b.name) {
    //       return -1
    //     }
    //     if (a.name > b.name) {
    //       return 1
    //     }
    //
    //     return 0 // names must be equal
    //   })
    //
    //   return dataList
    // }
  },

  methods: {
  	toggleHamburger () {
    	this.open = !this.open
    },

    /*toggleGoogleAnalytics () {
      if (window.localStorage) {
        if (localStorage.getItem('ga-toggle') === 'false') {
          return true
        }
      }
      else {
        if (this.$cookies.get('ga-toggle', { parseJSON: false }) === 'false') {
          return true
        }
      }

      return false
    },*/

    slugify (string) {
      return helperSlugify.slugify(string)
    }
  },

  head() {
    return {
      //__dangerouslyDisableSanitizers: ['script'],
      script: [
        //{ innerHTML: "window['ga-disable-" + process.env.googleAnalyticsID + "'] = " + this.googleAnalyticsDisableToggle + ";" }, // if 'true' it disables from sending data to Google Analytics
        { async: true, src: 'https://www.google-analytics.com/analytics.js' }
      ]
    }
  }
}

</script>
