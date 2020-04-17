<template>
  <div>
    <page-header :displayHero="displayHero" :settingsHeader="settingsHeader" />
    <h1 class="sr-only"><nuxt-link exact to="/">Local Transport Today Discussion</nuxt-link></h1>
    <div role="main" id="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
      <div class="w-full mt-10 mx-6 lg:mx-4">
        <div :class="latestEditorials.length > 5 ? 'newspaper': 'newspaper-truncated'">
          <template v-for="(article, key) in latestEditorials" v-if="key <= 6">
            <div :class="'cell cell--' + key">
              <article role="article" itemscope itemtype="https://schema.org/Article" class="article-item">
                <aside role="complementary" class="w-full">
                  <h4 :id="'article-links-title-' + key" class="sr-only no-print">Article Links:</h4>
                  <ul :aria-labelledby="'article-links-title-' + key" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                    <li v-if="article.categories.length > 0" class="inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" :href="'/category/' + slugify(article.categories[0])">{{ article.categories[0] }}</a></li>
                    <li class="inline-block no-print"><a class="leading-none text-sm no-underline ltt-text-pink-50 hover:ltt-text-pink focus:ltt-text-pink" href="#" title="Bookmark"><svg aria-hidden="true" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"/></svg><span class="sr-only pl-2 align-text-bottom font-sans font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Bookmark article</span></a></li>
                  </ul>
                </aside>
                <h2 itemprop="headline" :class="key <= 1 ? 'md:leading-tighter md:text-5xl': 'md:text-2xl'" class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl"><a rel="bookmark" class="ltt-text-red no-underline hover:underline focus:underline" :href="'/'+article.slug">{{ article.headline }}</a></h2>
                <p itemprop="subheading" :class="key <= 1 ? 'md:text-xl lg:text-xl highlight-first-line': ''" class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">{{ article.subHeadline }}</p>
                <aside role="complementary" class="w-full">
                  <h4 :id="'article-meta-title-' + key" class="sr-only no-print">Article information:</h4>
                  <ul :aria-labelledby="'article-meta-title-' + key" :class="key <= 1 ? 'text-base': 'text-sm'" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal pl-0 list-none">
                    <li class="pr-8 inline-block"><a rel="author" itemprop="author" class="ltt-text-red no-underline hover:underline focus:underline" :href="'/author/' + slugify(article.author)">{{ article.author }}</a></li>
                    <li class="pr-8 inline-block"><time itemprop="dateCreated pubdate datePublished" :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
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
              <aside role="complementary">
                <h2 id="featured-author" class="w-full mb-8 text-left text-base font-serif text-gray-333">Featured: <a class="ltt-text-red no-underline hover:underline focus:underline" :href="'/author/' + slugify(settingsHome.featuredAuthor)">{{ settingsHome.featuredAuthor }}</a></h2>
                <ul aria-labelledby="featured-author" class="list-none pl-0">
                  <li v-for="(article, key) in featuredAuthorEditorials" class="block line-after my-3">
                    <article role="article" itemscope itemtype="https://schema.org/Article">
                      <h3 itemprop="headline" class="w-full my-4 font-sans text-left font-bold leading-tight text-xl md:text-sm"><a class="ltt-text-red no-underline hover:underline focus:underline" :href="'/'+article.slug">{{ article.headline }}</a></h3>
                      <aside role="complementary" class="w-full">
                        <h4 :id="'featured-author-'+key" class="sr-only no-print">Article information:</h4>
                        <ul :aria-labelledby="'featured-author-'+key" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                          <li class="pr-6 inline-block"><time itemprop="dateCreated pubdate datePublished" :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
                          <li class="inline-block" :aria-label="article.estimatedReadingTimeMinutes + ' minute read'">{{ article.estimatedReadingTimeMinutes }} min read</li>
                        </ul>
                      </aside>
                    </article>
                  </li>
                </ul>
              </aside>
            </div>
          </template>
          <template v-else>
            <template v-for="(article, key) in latestEditorials" v-if="key >= 7 && key <= 9">
              <div :class="'cell cell--' + (key + 1)">
                <article role="article" itemscope itemtype="https://schema.org/Article" class="article-item">
                  <aside role="complementary" class="w-full">
                    <h4 :id="'article-links-title-' + (key + 1)" class="sr-only no-print">Article Links:</h4>
                    <ul :aria-labelledby="'article-links-title-' + (key + 1)" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                      <li v-if="article.categories.length > 0" class="inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" :href="'/category/' + slugify(article.categories[0])">{{ article.categories[0] }}</a></li>
                      <li class="inline-block no-print"><a class="leading-none text-sm no-underline ltt-text-pink-50 hover:ltt-text-pink focus:ltt-text-pink" href="#" title="Bookmark"><svg aria-hidden="true" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"/></svg><span class="sr-only pl-2 align-text-bottom font-sans font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Bookmark article</span></a></li>
                    </ul>
                  </aside>
                  <h2 itemprop="headline" :class="key <= 1 ? 'md:leading-tighter md:text-5xl': 'md:text-2xl'" class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl"><a rel="bookmark" class="ltt-text-red no-underline hover:underline focus:underline" :href="'/'+article.slug">{{ article.headline }}</a></h2>
                  <p itemprop="subheading" :class="key <= 1 ? 'md:text-xl lg:text-xl highlight-first-line': ''" class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">{{ article.subHeadline }}</p>
                  <aside role="complementary" class="w-full">
                    <h4 :id="'article-meta-title-' + (key + 1)" class="sr-only no-print">Article information:</h4>
                    <ul :aria-labelledby="'article-meta-title-' + (key + 1)" :class="key <= 1 ? 'text-base': 'text-sm'" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal pl-0 list-none">
                      <li class="pr-8 inline-block"><a rel="author" itemprop="author" class="ltt-text-red no-underline hover:underline focus:underline" :href="'/author/' + slugify(article.author)">{{ article.author }}</a></li>
                      <li class="pr-8 inline-block"><time itemprop="dateCreated pubdate datePublished" :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
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
//import slugify from '~/plugins/slugify.js'

export default {
  data: function () {
    return {
      displayHero: true,
      displaySidebar: false
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
    if (this.$store.getters['settings/retrieveSettings']('home').featuredAuthor) {
      this.displaySidebar = true
    }
  },

  computed: {
    settingsHeader () {
      return this.$store.getters['settings/retrieveSettings']('header')
    },

    settingsHome () {
      return this.$store.getters['settings/retrieveSettings']('home')
    },

    latestEditorials () {
      return this.$store.getters['editorials/retrieveAllEditorials']
    },

    featuredAuthorEditorials () {
      return this.$store.getters['editorials/retrieveAuthorEditorials'](this.settingsHome.featuredAuthor)
    }
  },

  methods: {
    dayjsNuxt (timestamp, format) {
      return dayjs(String(timestamp)).format(String(format))
    },

    slugify (string) {
      return helperSlugify.slugify(string)
    }

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
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
        //{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }
        //{ src: 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js' }
      ],
      title: 'Local Transport Today - Transport Policy, Planning, Finance, Development',
      meta: [
        { hid: 'description', name: 'description', content: 'Local Transport Today' }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: 'https://discussion.localtransport.today' }
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
