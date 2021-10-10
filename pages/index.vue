<template>
  <div>
    <page-header :displayHero="displayHero" :pageName="pageName" />
    <h1 class="sr-only"><nuxt-link exact to="/">Local Transport Today Discussion</nuxt-link></h1>
    <div role="main" id="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
      <div v-if="settingsHome.masthead === 'cta' || settingsHome.masthead === 'intro'" class="w-full mt-6 md:mt-8">
        <aside v-if="settingsHome.masthead === 'cta'" role="complementary" class="alert-box flex flex-col lg:flex-row lg:justify-center lg:items-center w-full">
          <div class="p-6 lg:mr-4 lg:-ml-12 lg:max-width-28">
            <h2 v-if="settingsHome.cta.headline" class="w-full text-left text-base leading-tight font-sans ltt-headline">{{ settingsHome.cta.headline }}</h2>
              <p v-if="settingsHome.cta.subHeadline" class="font-serif text-left text-gray-333 font-normal leading-normal text-sm sm:text-base md:text-sm">{{ settingsHome.cta.subHeadline }}</p>
              <p v-if="settingsHome.cta.date" class="font-serif mt-2 text-left ltt-text-gray font-normal leading-normal text-sm sm:text-base md:text-sm"><time :datetime="settingsHome.cta.date" :aria-label="dayjsNuxt(settingsHome.cta.date, 'D MMMM YYYY')">{{ dayjsNuxt(settingsHome.cta.date, 'D MMM YYYY') }}</time></p>
          </div>
          <div v-if="settingsHome.cta.button.url" class="px-6 pb-6 lg:px-0 lg:pb-0">
            <p class="mx-auto font-sans text-center leading-tight max-width-90p lg:max-w-none text-sm lg:text-left"><a :href="settingsHome.cta.button.url" class="red-block flex lg:inline-flex flex-row items-center"><svg v-if="settingsHome.cta.button.icon" aria-hidden="true" focusable="false" class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path :d="settingsHome.cta.button.icon === 'video' ? 'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z': 'M 19.42928,12.67 8.38214,23.7171 Q 8.09926,24 7.71216,24 7.32506,24 7.04219,23.7171 L 4.57072,21.2457 q -0.28288,-0.2829 -0.28288,-0.67 0,-0.3871 0.28288,-0.67 L 12.47643,12 4.57072,4.0943 q -0.28288,-0.2829 -0.28288,-0.67 0,-0.3871 0.28288,-0.67 L 7.04219,0.2829 Q 7.32506,0 7.71216,0 8.09926,0 8.38214,0.2829 L 19.42928,11.33 q 0.28288,0.2829 0.28288,0.67 0,0.3871 -0.28288,0.67 z'" /></svg>
            <span>{{ settingsHome.cta.button.text }}</span></a></p>
          </div>
        </aside>
        <aside v-if="settingsHome.masthead === 'intro'" role="complementary" class="alert-box flex flex-col lg:flex-row lg:justify-center lg:items-center w-full">
          <div class="p-6">
            <h2 v-if="settingsHome.intro.headline" class="w-full text-left text-base leading-tight font-sans ltt-headline mb-4">{{ settingsHome.intro.headline }}</h2>
            <div v-html="parseMarkdown(settingsHome.intro.body)" class="alert-box-copy md:fluid-column font-serif text-left text-gray-333 font-normal leading-normal text-sm sm:text-base md:text-sm"></div>
          </div>
        </aside>
      </div>
      <div :class="settingsHome.masthead === 'none' ? 'mt-8' : ''" class="w-full mx-6 lg:mx-4 print:mx-0">
        <div :class="latestEditorials.length > 5 ? 'newspaper': 'newspaper-truncated'">
          <template v-for="(article, key) in latestEditorials" v-if="key <= 6">
            <div :class="'cell cell--' + key">
              <article role="article" :aria-labelledby="'headline-' + key" class="article-item">
                <h2 v-if="key === 0" class="w-full text-left text-base leading-none font-sans ltt-headline mb-8"><nuxt-link v-scroll-to="{ el: '#headline-' + key, offset: -75, duration: 1000 }" :to="'#headline-' + key" class="red-block inline-block">Latest Discussions<br /><span class="text-white opacity-75 text-xs">from LTT<template v-if="article.issue"> issue № {{ article.issue }}</template></span></nuxt-link></h2>
                <h2 v-if="key === 2" class="w-full text-left text-base leading-none font-sans ltt-headline mb-8"><nuxt-link v-scroll-to="{ el: '#headline-' + key, offset: -75, duration: 1000 }" :to="'#headline-' + key" class="red-block inline-block">Recent Discussions<br /><span class="text-white opacity-75 text-xs">from LTT</span></nuxt-link></h2>
                <aside role="complementary" class="w-full">
                  <p :id="'article-links-title-' + key" class="sr-only no-print">Article Links:</p>
                  <ul role="list" :aria-labelledby="'article-links-title-' + key" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose text-base pl-0 list-none">
                    <li v-if="article.categories.length > 0" class="inline-block"><nuxt-link class="ltt-text-red no-underline hover:underline focus:underline" :to="'/category/' + slugify(article.categories[0]) + '/'">{{ article.categories[0] }}</nuxt-link></li>
                    <!-- <li class="inline-block no-print">
                      <button :title="bookmarked(article.md5) ? 'Remove bookmark': 'Bookmark article'" :class="bookmarked(article.md5) ? 'ani-sparkle-once': ''" class="focus-outline-none leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" @click="toggle(article.md5)">
                        <svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path :d="bookmarked(article.md5) ? 'M 17,3 H 7 C 5.9,3 5,3.9 5,5 v 16 l 7,-3 7,3 V 5 C 19,3.9 18.1,3 17,3 Z': 'M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z'" />
                        </svg>
                        <span v-if="bookmarked(article.md5)" class="sr-only">Remove bookmark for this article</span>
                        <span v-else class="sr-only">Bookmark this article</span>
                      </button>
                    </li> -->
                  </ul>
                </aside>
                <h3 :id="'headline-' + key" :class="key <= 1 ? 'md:leading-tighter md:text-5xl': 'md:text-2xl'" class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl"><nuxt-link rel="bookmark" class="ltt-headline no-underline hover:underline focus:underline" :to="'/' + article.slug + '/'">{{ article.headline }}</nuxt-link></h3>
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
            <template v-if="latestEditorials.length < num">
              <div :class="'hidden md:block cell cell--' + (num - 1)"></div>
            </template>
          </template>
          <!-- <template v-if="displaySidebar"> -->
            <div class="cell cell--7">
              <aside role="complementary" class="no-print">
                <h2 id="transport-experts" class="w-full text-left text-base leading-none font-sans ltt-headline mb-8"><nuxt-link class="red-block inline-block" to="/author/">Transport Opinion<br /><span class="text-white opacity-75 text-xs">from our Contributors</span></nuxt-link></h2>
                <ul role="list" aria-labelledby="transport-experts" class="list-none pl-0">
                  <li v-for="(author, key) in allAuthors" v-if="author.editorials.length > 0" class="block my-6">
                    <div class="flex flex-row">
                      <div class="flex-basis-25">
                        <figure v-if="author.author.photo">
                          <img loading="lazy" class="notch-small max-w-full" width="100" height="100" :src="author.author.photo" :alt="author.author.name" :title="author.author.name" />
                        </figure>
                      </div>
                      <div class="flex-basis-75">
                        <div class="pl-4">
                          <h3 class="w-full mb-1 font-sans text-left font-bold leading-tight text-base sm:text-xl md:text-sm"><nuxt-link class="ltt-headline no-underline hover:underline focus:underline" :to="'/author/' + slugify(author.author.name) + '/'">{{ author.author.name }}</nuxt-link></h3>
                          <h4 v-for="(article, index) in author.editorials" v-if="index < 1" class="w-full font-serif text-left font-normal leading-tight text-sm sm:text-base md:text-sm"><nuxt-link class="text-gray-333 no-underline hover:underline focus:underline" :to="'/' + article.slug + '/'">{{ article.headline }}</nuxt-link></h4>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </aside>
              <aside role="complementary" class="no-print">
                <h2 id="download-ltt" class="w-full text-left text-base leading-none font-sans ltt-headline mb-8"><nuxt-link class="red-block inline-block" to="/author/">LTT Subscription<br /><span class="text-white opacity-75 text-xs">released fortnightly</span></nuxt-link></h2>
                <ul role="list" aria-labelledby="download-ltt" class="list-none pl-0">
                  <li class="block my-6">
                    <a href="https://apps.apple.com/tt/app/local-transport-today/id1532204990"><img loading="lazy" class="w-48" src="~assets/img/appstore.png" alt="Download on the App Store" /></a>
                  </li>
                  <li class="block my-6">
                    <a href="https://play.google.com/store/apps/details?id=com.pagesuite.localtransport"><img loading="lazy" class="w-48" src="~assets/img/google_play.png" alt="Get it on Google Play" /></a>
                  </li>
                  <li class="block my-6">
                    <a href="https://subscriber.pagesuite-professional.co.uk/subscribe.aspx?t=2135&eid=037b1581-0376-473b-8655-0f5cd55cc151"><img loading="lazy" class="w-48" src="~assets/img/desktop_pwa.png" alt="Read it on your desktop" /></a>
                  </li>
                  <li class="block my-6">
                    <a href="https://www.lttmagazine.co.uk/issue/831"><img loading="lazy" class="w-48" src="~assets/img/read_pdf.png" alt="Read it as a PDF" /></a>
                  </li>
                </ul>
              </aside>
              <!-- <aside role="complementary" class="no-print" aria-live="polite" aria-atomic="false" aria-relevant="additions removals text">
                <h2 id="your-bookmarks" class="w-full text-left text-base leading-none font-sans ltt-headline my-4"><nuxt-link class="red-block inline-block" to="/myltt#bookmarks">Your Bookmarks<br /><span class="text-white opacity-75 text-xs">{{ bookmarkedEditorials.length === 0 ? 'No' : bookmarkedEditorials.length }} discussion<template v-if="bookmarkedEditorials.length !== 1">s</template> saved</span></nuxt-link></h2>
                <div v-if="bookmarkedEditorials.length === 0" class="font-serif mb-4 text-left text-gray-333 leading-normal text-sm">
                  <p class="italic">You don’t have any bookmarks saved! Simply click the bookmark icon <sup class="top-0 ltt-text-gray" aria-hidden="true"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="fill-current h-4 w-4"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"></path></svg></sup> alongside any article to store them inside <nuxt-link to="/myltt#bookmarks" class="ltt-text-red no-underline hover:underline focus:underline"><span class="font-serif italic opacity-75">my</span>LTT</nuxt-link>.</p>
                </div>
                <ul v-else role="list" aria-labelledby="your-bookmarks" class="list-disc pl-0">
                  <template v-for="(article, key) in bookmarkedEditorials">
                    <transition name="fade">
                      <li class="mb-2 ltt-text-red"><nuxt-link class="ltt-headline font-serif text-sm no-underline hover:underline focus:underline" :to="'/' + article.slug + '/'">{{ article.headline }}</nuxt-link></li>
                    </transition>
                  </template>
                </ul>
              </aside> -->
            </div>
          <!-- </template>
          <template v-else>
            <template v-for="(article, key) in latestEditorials" v-if="key >= 7 && key <= 9">
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
                <template v-if="latestEditorials.length < num">
                  <div :class="'hidden md:block cell cell--' + num"></div>
                </template>
              </template>
            </template>
          </template> -->
        </div>
      </div>
      <div class="alternate-sections w-full mt-10">
        <section v-for="(category, index) in allCategories" v-if="category.editorials.length > 1" :id="'category-' + category.slug" class="p-6 lg:p-4 print:px-0">
          <div class="newspaper-category">
            <template v-for="(article, key) in category.editorials" v-if="key <= 6">
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
              <template v-if="category.editorials.length < num">
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
import helperMd5 from '~/assets/js/md5.js'
import helperSlugify from '~/assets/js/slugify.js'
import helperEstimateReadingTime from '~/assets/js/reading-time.js'
import helperMarkdown from '~/assets/js/markdown.js'
import pkg from '~/package'
import { mapMutations } from 'vuex'

export default {
  data: function () {
    return {
      displayHero: true,
      //displaySidebar: false,
      pageName: 'home'
    }
  },

  components: {
    PageHeader
  },

  async asyncData({ params, payload }) {

    function md5 (string) {
      return helperMd5.md5(string)
    }

    function estimateReadingTime (articleBody) {
      return helperEstimateReadingTime.estimateReadingTime(articleBody)
    }

    function convertNameToAlphabetical (name) {
      let nameArray = name.split(' ')
      let firstname = nameArray.shift() // also removes first item from the array
      nameArray.push(firstname)
      return nameArray.join(' ')
    }

    if (payload) {
      return {
        allAuthors: payload.authors,
        allCategories: payload.categories,
        latestEditorials: payload.editorials,
        settingsHome: payload.settings
      }
    }
    else {
      let settingsHome = await require(`~/assets/content/settings/home.json`)

      let contextEditorials = await require.context('~/assets/content/editorials/', false, /\.json$/)

      let allEditorials = await contextEditorials.keys().map(key => ({
        ...contextEditorials(key),
        slug: `${key.replace('.json', '').replace('./', '')}`,
        md5: md5(`${key.replace('.json', '').replace('./', '')}`),
        estimatedReadingTimeMinutes: estimateReadingTime(contextEditorials(key).body)
      }))

      allEditorials.sort(function (a, b) {
        if (a.datePublished < b.datePublished) {
          return 1
        }
        if (a.datePublished > b.datePublished) {
          return -1
        }

        return 0 // names must be equal
      })

      let editorialsIndex = allEditorials.filter(x => x.published === true)

      let contextCategories = await require.context('~/assets/content/categories/', false, /\.json$/)

      let allCategories = await contextCategories.keys().map(key => ({
        ...contextCategories(key),
        slug: `${key.replace('.json', '').replace('./', '')}`,
      }))

      let categoryIndex = allCategories.map(category => {
        let categoryEditorials = allEditorials.filter(x => x.published === true && x.categories.includes(category.name))

        return {
          slug: category.slug,
          name: category.name,
          editorials: categoryEditorials
        }
      })

      let contextAuthors = await require.context('~/assets/content/authors/', false, /\.json$/)

      let allAuthors = await contextAuthors.keys().map(key => ({
        ...contextAuthors(key),
        slug: `${key.replace('.json', '').replace('./', '')}`,
        a2z: convertNameToAlphabetical(contextAuthors(key).name)
      }))

      allAuthors.sort((a, b) => a.a2z.localeCompare(b.a2z))

      let authorIndex = allAuthors.map(author => {
        let authorEditorials = allEditorials.filter(x => x.published === true && x.author === author.name)

        return {
          slug: author.slug,
          author: author,
          editorials: authorEditorials
        }
      })

      return {
        allAuthors: authorIndex,
        allCategories: categoryIndex,
        latestEditorials: editorialsIndex,
        settingsHome: settingsHome
      }
    }
  },

  mounted() {
    /*if (this.$store.getters['settings/retrieveSetting']('home').featuredAuthor) {
      this.displaySidebar = true
    }*/

    //this.updateBookmarkState()
  },

  computed: {
    // settingsHeader () {
    //   return this.$store.getters['settings/retrieveSetting']('header')
    // },

    // settingsHome () {
    //   return this.$store.getters['settings/retrieveSetting']('home')
    // },

    // latestEditorials () {
    //   return this.$store.getters['editorials/retrieveAllEditorials']
    // },

    /*featuredAuthorEditorials () {
      return this.$store.getters['editorials/retrieveAuthorEditorials'](this.settingsHome.featuredAuthor)
    },*/

    // allAuthors () {
    //   return this.$store.state.authors.authors
    // },

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

    // allBookmarks () {
    //   return this.$store.getters['bookmarks/retrieveBookmarks']
    // },

    // authorEditorials (author) {
    //   return this.$store.getters['editorials/retrieveAuthorEditorials'](author)
    // },

    // categoryEditorials (category) {
    //   return this.$store.getters['editorials/retrieveCategoryEditorials'](category)
    // },

    parseMarkdown (content) {
      return helperMarkdown.parseMarkdown(content)
    },

    // ...mapMutations({
    //   toggle: 'bookmarks/TOGGLE_BOOKMARK',
    //   updateBookmarkState: 'bookmarks/UPDATE_BOOKMARKS'
    // })
  },

  head() {
    let structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": pkg.homepageURL,
      "publisher": {
        "@type": "Organization",
        "name": pkg.description,
        "url": pkg.homepageURL,
        "logo": {
          "@type": "ImageObject",
          "url": pkg.homepageURL + "/local_transport_today_logo_square_colour.png",
          "width": 480,
          "height": 480
        }
      },
      "image": {
        "@type": "ImageObject",
        "url": pkg.homepageURL + "/local_transport_today_logo_square_colour.png",
        "width": 480,
        "height": 480
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pkg.homepageURL
      }
    }

    structuredData.potentialAction = [{
      "@type": "SearchAction",
      "target": pkg.homepageURL + "/search/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }]

    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(structuredData), type: 'application/ld+json' }
      ],
      title: pkg.description,
      link: [
        { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL }
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
