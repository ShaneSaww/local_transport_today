<template>
  <div>
    <page-header :displayHero="displayHero" />
    <h1 class="sr-only"><nuxt-link exact to="/">Local Transport Today Discussion</nuxt-link></h1>
    <div role="main" id="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
      <div class="border-t border-b border-solid ltt-border-gray mt-10 mx-6 lg:mx-4 max-w-sm md:max-w-lg">
        <div class="newspaper">
          <div class="cell cell--1">
            <article class="article-item">
              <h2 class="font-sans font-extrabold leading-tight md:leading-tighter text-gray-333 mb-4 text-2xl md:text-4xl lg:mt-0">Headline</h2>
            </article>
          </div>
          <div class="cell cell--2">
            <article class="article-item">
              <h2 class="font-sans font-extrabold leading-tight md:leading-tighter text-gray-333 mb-4 text-2xl md:text-3xl lg:mt-0">Headline</h2>
            </article>
          </div>
          <div class="cell cell--3">
            <article class="article-item">
              <h2 class="font-sans font-extrabold leading-tight md:leading-tighter text-gray-333 mb-4 text-2xl md:text-3xl lg:mt-0">Headline</h2>
            </article>
          </div>
          <div class="cell cell--4">
            <article class="article-item">
              <h2 class="font-sans font-extrabold leading-tight md:leading-tighter text-gray-333 mb-4 text-2xl md:text-3xl lg:mt-0">Headline</h2>
            </article>
          </div>
          <div class="cell cell--5">
            <article class="article-item">
              <h2 class="font-sans font-extrabold leading-tight md:leading-tighter text-gray-333 mb-4 text-2xl md:text-3xl lg:mt-0">Headline</h2>
            </article>
          </div>
          <div class="cell cell--6">
            <article class="article-item">
              <h2 class="font-sans font-extrabold leading-tight md:leading-tighter text-gray-333 mb-4 text-2xl md:text-3xl lg:mt-0">Headline</h2>
            </article>
          </div>
          <div class="cell cell--7">
            <aside>
              <ul>
                <li>Headline 1</li>
                <li>Headline 2</li>
                <li>Headline 3</li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import dayjs from 'dayjs'

export default {
  data: function () {
    return {
      displayHero: true
      //structuredData: this.$store.state.event.structuredData
    }
  },

  components: {
    PageHeader
  },

  async fetch ({ store }) {
    //await store.dispatch('event/retrieveEvent')
  },

  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }
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
</script>
