<template>
  <header id="header" role="banner" class="w-full ltt-header fixed top-0 left-0 right-0 z-50">
    <!--<nav role="navigation" class="w-full flex flex-col font-sans block text-sm px-6 py-3 leading-normal md:flex-row md:justify-between md:leading-none">-->
    <nav role="navigation" class="w-full flex flex-col lg:flex-row lg:justify-between font-sans block text-sm px-6 py-3 leading-normal md:leading-none">
      <div class="flex flex-row justify-between">
        <div class="block self-center">
          <h1><nuxt-link exact to="/" class="font-sans ltt-text-red no-underline tracking-wide">LTT<span class="ltt-text-gray font-serif italic tracking-normal"> Discussion</span></nuxt-link></h1>
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
      <div :class="open ? 'block': 'hidden'" class="w-full block flex-grow lg:flex lg:w-auto">
        <ul aria-labelledby="header-nav-title" class="menu-header w-full px-4 lg:px-0 lg:flex lg:justify-end lg:items-center list-none text-sm">
          <li class="my-6 lg:my-2 lg:mx-4"><nuxt-link to="#">All</nuxt-link></li>
          <li class="my-6 lg:my-2 lg:mx-4"><nuxt-link to="#">Policy</nuxt-link></li>
          <li class="my-6 lg:my-2 lg:mx-4"><nuxt-link to="/">Planning</nuxt-link></li>
          <li class="my-6 lg:my-2 lg:mx-4"><nuxt-link to="#">Finance</nuxt-link></li>
          <li class="my-6 lg:my-2 lg:mx-4"><nuxt-link to="#">Development</nuxt-link></li>
        </ul>
      </div>
    </nav>

    <!--<div :class="displayHero ? 'header-min-height hero-logo-gradient-svg': ''" class="hero-logo-gradient">
      <nav :class="displayHero ? 'justify-end lg:justify-between': 'justify-between'" role="navigation" class="flex items-start flex-wrap p-6 w-screen">
        <h2 class="sr-only">Site navigation</h2>
        <div v-if="!displayHero" class="flex items-center flex-no-shrink text-white mr-6">
          <nuxt-link exact to="/" class="no-underline text-white"><img width="200" height="87" src="~assets/img/northern_travel_tourism_show_white_shadow.svg" alt="Northern Travel and Tourism logo" /><span class="sr-only">Northern Travel &amp; Tourism Show - Group Travel Show for group organisers, travel trade and tour operators</span></nuxt-link>
        </div>
        <div class="block lg:hidden">
          <button @click="toggleHamburger" class="flex items-center px-3 py-2 border-2 rounded text-white border-white">
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
        <div :class="open ? 'block opacity-black-085': 'hidden bg-black-0'" class="w-full block flex-grow lg:flex lg:w-auto">
          <ul class="w-full pl-4 lg:flex lg:justify-end lg:items-center list-none text-sm lg:pl-0">
            <li v-if="!displayHero" class="mr-8 mt-4 block lg:inline-block lg:mt-0">
              <nuxt-link to="/#visitors" class="font-sans no-underline text-white font-bold text-shadow text-base lg:text-xg lg:text-xl hover:underline focus:underline hover:goshow-text-yellow focus:goshow-text-yellow">Visitors</nuxt-link>
            </li>
            <li v-else class="mr-8 mt-4 block lg:inline-block lg:mt-0">
              <nuxt-link v-scroll-to="'#visitors'" to="#visitors" class="font-sans no-underline text-white font-bold text-shadow text-base lg:text-xg lg:text-xl hover:underline focus:underline hover:goshow-text-yellow focus:goshow-text-yellow">Visitors</nuxt-link>
            </li>
            <li v-if="!displayHero" class="mr-8 mt-4 block lg:inline-block lg:mt-0">
              <nuxt-link to="/#exhibitors" class="font-sans no-underline text-white font-bold text-shadow text-base lg:text-xg lg:text-xl hover:underline focus:underline hover:goshow-text-yellow focus:goshow-text-yellow">Exhibitors</nuxt-link>
            </li>
            <li v-else class="mr-8 mt-4 block lg:inline-block lg:mt-0">
              <nuxt-link v-scroll-to="'#exhibitors'" to="#exhibitors" class="font-sans no-underline text-white font-bold text-shadow text-base lg:text-xg lg:text-xl hover:underline focus:underline hover:goshow-text-yellow focus:goshow-text-yellow">Exhibitors</nuxt-link>
            </li>
            <li v-if="!displayHero" class="mr-8 mt-4 block lg:inline-block lg:mt-0">
              <nuxt-link to="/#venue" class="font-sans no-underline text-white font-bold text-shadow text-base lg:text-xg lg:text-xl hover:underline focus:underline hover:goshow-text-yellow focus:goshow-text-yellow">Venue</nuxt-link>
            </li>
            <li v-else class="mr-8 mt-4 block lg:inline-block lg:mt-0">
              <nuxt-link v-scroll-to="'#venue'" to="#venue" class="font-sans no-underline text-white font-bold text-shadow text-base lg:text-xg lg:text-xl hover:underline focus:underline hover:goshow-text-yellow focus:goshow-text-yellow">Venue</nuxt-link>
            </li>
            <li class="mr-4 mt-4 mb-4 block lg:inline-block lg:mt-0 lg:mb-0">
              <nuxt-link to="/visitors/registration" class="font-sans inline-block text-sm px-6 py-3 leading-none border-2 rounded no-underline text-white font-bold text-base lg:text-xl border-white-04 northshow-bg-red-dark hover:northshow-bg-red-light focus:northshow-bg-red-light md:shadow-md">Free Tickets</nuxt-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>-->
  </header>
</template>

<script>

//import Homepage from '~/pages/index.vue'

export default {
  data: function () {
    return {
      open: false
    }
  },

  //this.$bus.$on('display-hero', () => {})

  props: {
    displayHero: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  /*this.$root.$on('displayHeroPhoto', displayHero => {
    console.log
  })*/

  methods: {
  	toggleHamburger() {
    	this.open = !this.open
    }

    /*if (!this.$nuxt.$route.path || this.$nuxt.$route.path === '/') {
      console.log('Hello Bob')
    }*/
  },

  head() {
    return {
      script: [
        //{ src: '~/plugins/intersection-observer.js' },
        //{ async: true, src: 'https://www.google-analytics.com/analytics.js' }
        //{ async: true, src: '~/plugins/autotrack.js' }
      ]
    }
  }
}

</script>
