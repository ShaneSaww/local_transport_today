<template>
  <div>
    <page-header :displayHero="displayHero" :pageName="pageName" />
    <div role="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
      <div role="article" class="mt-10 mx-6 lg:mx-4 max-w-sm md:max-w-lg">
        <h1 class="font-sans font-extrabold text-left leading-tight md:leading-tighter ltt-text-red my-4 text-4xl md:text-6xl">About</h1>
        <div v-html="parseMarkdown(content.body)" class="content-text-spacing font-serif mb-4 text-left text-gray-333 leading-normal text-base md:text-xl"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import dayjs from 'dayjs'
import helperSlugify from '~/assets/js/slugify.js'
import helperMarkdown from '~/assets/js/markdown.js'
import pkg from '~/package'

export default {
  data: function () {
    return {
      displayHero: true,
      displaySidebar: false,
      pageName: 'about'
    }
  },

  components: {
    PageHeader
  },

  async asyncData({ params, payload }) {
    if (payload) {
      return {
        content: payload.content
      }
    }
    else {
      let content = await require(`~/assets/content/pages/about.json`)

      return {
        content
      }
    }
  },

  mounted() {

  },

  computed: {
    // settingsHeader () {
    //   return this.$store.getters['settings/retrieveSetting']('header')
    // },
  },

  methods: {
    dayjsNuxt (timestamp, format) {
      return dayjs(String(timestamp)).format(String(format))
    },

    slugify (string) {
      return helperSlugify.slugify(string)
    },

    parseMarkdown (content) {
      return helperMarkdown.parseMarkdown(content)
    },
  },

  head() {
    return {
      //__dangerouslyDisableSanitizers: ['script'],
      title: 'About - ' + pkg.description,
      meta: [

      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL + '/about/' }
      ]
    }
  }
}
</script>
