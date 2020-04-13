<template>
  <div>
    <page-header :displayHero="displayHero" />
    <h1 class="sr-only"><nuxt-link exact to="/">Local Transport Today Discussion</nuxt-link></h1>
    <div role="main" id="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
      <div class="w-full mt-10 mx-6 lg:mx-4">
        <div class="newspaper">
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
                <h2 itemprop="headline" :class="key <= 1 ? 'md:leading-tighter md:text-5xl': 'md:text-2xl'" class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl"><a rel="bookmark" class="ltt-text-red no-underline hover:underline focus:underline" :href="'/' + slugify(article.headline)">{{ article.headline }}</a></h2>
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
          <!--<div class="cell cell--0">
            <article role="article" itemscope itemtype="https://schema.org/Article" class="article-item">
              <aside role="complementary" class="w-full">
                <h4 id="article-links-title-0" class="sr-only no-print">Article Links:</h4>
                <ul aria-labelledby="article-links-title-0" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                  <li class="inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Electric Vehicles</a></li>
                  <li class="inline-block no-print"><a class="leading-none text-sm no-underline ltt-text-pink-50 hover:ltt-text-pink focus:ltt-text-pink" href="#" title="Bookmark"><svg aria-hidden="true" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"/></svg><span class="sr-only pl-2 align-text-bottom font-sans font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Bookmark article</span></a></li>
                </ul>
              </aside>
              <h2 itemprop="headline" class="w-full my-4 font-sans text-left font-extrabold leading-tight md:leading-tighter text-2xl md:text-5xl"><a rel="bookmark" class="ltt-text-red no-underline hover:underline focus:underline" href="#">Driving change: travel in the 21<sup>st</sup> century</a></h2>
              <p itemprop="subheading" class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base md:text-xl lg:text-xl highlight-first-line">Some of the worst mistakes in transport investment have been supported by huge volumes of forecasts, surveys and studies, confidently published with little recognition of their inconsistencies and errors.</p>
              <aside role="complementary" class="w-full">
                <h4 id="article-meta-title-0" class="sr-only no-print">Article information:</h4>
                <ul aria-labelledby="article-meta-title-0" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                  <li class="pr-8 inline-block"><a rel="author" itemprop="author" class="ltt-text-red no-underline hover:underline focus:underline" href="#">Phil Goodwin</a></li>
                  <li class="pr-8 inline-block"><time itemprop="dateCreated pubdate datePublished" datetime="2019-11-14">14 Nov 2019</time></li>
                  <li class="inline-block">8 min read</li>
                </ul>
              </aside>
            </article>
          </div>
          <div class="cell cell--1">
            <article role="article" class="article-item">
              <aside role="complementary" class="w-full">
                <h4 id="article-links-title-1" class="sr-only no-print">Article Links:</h4>
                <ul aria-labelledby="article-links-title-1" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                  <li class="inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Public Transport</a></li>
                  <li class="inline-block no-print"><a class="leading-none text-sm no-underline ltt-text-pink-50 hover:ltt-text-pink focus:ltt-text-pink" href="#" title="Bookmark"><svg aria-hidden="true" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"/></svg><span class="sr-only">Bookmark article</span></a></li>
                </ul>
              </aside>
              <h2 class="w-full my-4 font-sans text-left font-extrabold leading-tight md:leading-tighter text-2xl md:text-5xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Memo to Boris: scrap the monumental waste that is HS2</a></h2>
              <p class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base md:text-xl lg:text-xl highlight-first-line">HS2 is a vast project likely to make a financial loss in the hundreds of billions of pounds. Any political party promising to cancel would enhance its electoral chances.</p>
              <aside role="complementary" class="w-full">
                <h4 id="article-meta-title-1" class="sr-only no-print">Article information:</h4>
                <ul aria-labelledby="article-meta-title-1" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                  <li class="pr-8 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Paul Withrington</a></li>
                  <li class="pr-8 inline-block">14 Nov 2019</li>
                  <li class="inline-block">10 min read</li>
                </ul>
              </aside>
            </article>
          </div>
          <div class="cell cell--2">
            <article role="article" class="article-item">
              <aside role="complementary" class="w-full">
                <h4 id="article-links-title-2" class="sr-only no-print">Article Links:</h4>
                <ul aria-labelledby="article-links-title-1" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                  <li class="inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Pedestrians</a></li>
                  <li class="inline-block no-print"><a class="leading-none text-sm no-underline ltt-text-pink-50 hover:ltt-text-pink focus:ltt-text-pink" href="#" title="Bookmark"><svg aria-hidden="true" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"/></svg><span class="sr-only">Bookmark article</span></a></li>
                </ul>
              </aside>
              <h2 class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl md:text-2xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Re-think of side road junction layouts needed to ensure priority for pedestrians</a></h2>
              <p class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">The way we design our side roads has a huge impact on the lives (and deaths) of people walking.</p>
              <aside role="complementary" class="w-full">
                <h4 id="article-meta-title-2" class="sr-only no-print">Article information:</h4>
                <ul aria-labelledby="article-meta-title-2" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                  <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Lucy Marstrand</a></li>
                  <li class="inline-block">5 min read</li>
                </ul>
              </aside>
            </article>
          </div>
          <div class="cell cell--3">
            <article role="article" class="article-item">
              <aside role="complementary" class="w-full">
                <h4 id="article-links-title-3" class="sr-only no-print">Article Links:</h4>
                <ul aria-labelledby="article-links-title-3" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                  <li class="inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Public Transport</a></li>
                  <li class="inline-block no-print"><a class="leading-none text-sm no-underline ltt-text-pink-50 hover:ltt-text-pink focus:ltt-text-pink" href="#" title="Bookmark"><svg aria-hidden="true" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"/></svg><span class="sr-only">Bookmark article</span></a></li>
                </ul>
              </aside>
              <h2 class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl md:text-2xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Franchising or partnership: which is the better route to make bus services flourish?</a></h2>
              <p class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">The one-off costs of franchising will be large: to prepare contracts, compulsorily purchase depots, and compensate incumbents for the loss of goodwill.</p>
              <aside role="complementary" class="w-full">
                <h4 id="article-meta-title-3" class="sr-only no-print">Article information:</h4>
                <ul aria-labelledby="article-meta-title-3" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                  <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Edward Leigh</a></li>
                  <li class="inline-block">7 min read</li>
                </ul>
              </aside>
            </article>
          </div>
          <div class="cell cell--4">
            <article role="article" class="article-item">
              <aside role="complementary" class="w-full">
                <h4 id="article-links-title-4" class="sr-only no-print">Article Links:</h4>
                <ul aria-labelledby="article-links-title-4" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                  <li class="inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Urban Movement</a></li>
                  <li class="inline-block no-print"><a class="leading-none text-sm no-underline ltt-text-pink-50 hover:ltt-text-pink focus:ltt-text-pink" href="#" title="Bookmark"><svg aria-hidden="true" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"/></svg><span class="sr-only">Bookmark article</span></a></li>
                </ul>
              </aside>
              <h2 class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl md:text-5xl lg:text-2xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Politicians: work in progress</a></h2>
              <p class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">I wrote last time about the sad fate that befell a TfL-led proposal for cycle tracks. Since then, the plug has been pulled on two other active travel scheme proposals in London, with the political ‘justification’ being disconcertingly similar.</p>
              <aside role="complementary" class="w-full">
                <h4 id="article-meta-title-4" class="sr-only no-print">Article information:</h4>
                <ul aria-labelledby="article-meta-title-4" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                  <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">John Dales</a></li>
                  <li class="inline-block">5 min read</li>
                </ul>
              </aside>
            </article>
          </div>
          <div class="cell cell--5">
            <article role="article" class="article-item">
              <aside role="complementary" class="w-full">
                <h4 id="article-links-title-5" class="sr-only no-print">Article Links:</h4>
                <ul aria-labelledby="article-links-title-5" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                  <li class="inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Electric Vehicles</a></li>
                  <li class="inline-block no-print"><a class="leading-none text-sm no-underline ltt-text-pink-50 hover:ltt-text-pink focus:ltt-text-pink" href="#" title="Bookmark"><svg aria-hidden="true" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"/></svg><span class="sr-only">Bookmark article</span></a></li>
                </ul>
              </aside>
              <h2 class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl md:text-5xl lg:text-2xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Footways are no place for EV charging cables</a></h2>
              <p class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">Having failed to find evidence of a pending April Fool’s prank, I find myself compelled to pass the following comments.</p>
              <aside role="complementary" class="w-full">
                <h4 id="article-meta-title-5" class="sr-only no-print">Article information:</h4>
                <ul aria-labelledby="article-meta-title-5" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                  <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">John Mooney</a></li>
                  <li class="inline-block">3 min read</li>
                </ul>
              </aside>
            </article>
          </div>
          <div class="cell cell--6">
            <article role="article" class="article-item">
              <aside role="complementary" class="w-full">
                <h4 id="article-links-title-6" class="sr-only no-print">Article Links:</h4>
                <ul aria-labelledby="article-links-title-6" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-base pl-0 list-none">
                  <li class="inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Transport Infrastructure</a></li>
                  <li class="inline-block no-print"><a class="leading-none text-sm no-underline ltt-text-pink-50 hover:ltt-text-pink focus:ltt-text-pink" href="#" title="Bookmark"><svg aria-hidden="true" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"/></svg><span class="sr-only">Bookmark article</span></a></li>
                </ul>
              </aside>
              <h2 class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl md:text-5xl lg:text-2xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Where does the public fit in to Bristol’s transport priorities?</a></h2>
              <p class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">Bristol’s affectation of selecting wildly expensive and inappropriate transport infrastructure, instead of undertaking rational transport planning in anything resembling a democratic manner, continues unabated.</p>
              <aside role="complementary" class="w-full">
                <h4 id="article-meta-title-6" class="sr-only no-print">Article information:</h4>
                <ul aria-labelledby="article-meta-title-6" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                  <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Gavin Smith</a></li>
                  <li class="inline-block">2 min read</li>
                </ul>
              </aside>
            </article>
          </div>-->
          <div class="cell cell--7">
            <aside role="complementary">
              <h2 id="featured-author" class="w-full mb-8 text-left text-base font-serif text-gray-333">Featured: <a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Phil Goodwin</a></h2>
              <ul aria-labelledby="featured-author" class="list-none pl-0">
                <li v-for="(article, key) in featuredAuthorEditorials" class="block line-after my-3">
                  <article role="article" itemscope itemtype="https://schema.org/Article">
                    <h3 itemprop="headline" class="w-full my-4 font-sans text-left font-bold leading-tight text-xl"><a class="ltt-text-red no-underline hover:underline focus:underline" :href="'/'+article.slug">{{ article.headline }}</a></h3>
                    <aside role="complementary" class="w-full">
                      <h4 :id="'featured-author-'+key" class="sr-only no-print">Article information:</h4>
                      <ul :aria-labelledby="'featured-author-'+key" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                        <li class="pr-6 inline-block"><time itemprop="dateCreated pubdate datePublished" :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
                        <li class="inline-block" :aria-label="article.estimatedReadingTimeMinutes + ' minute read'">{{ article.estimatedReadingTimeMinutes }} min read</li>
                      </ul>
                    </aside>
                  </article>
                </li>
                <!--<li class="block line-after my-3">
                  <article class="">
                    <h3 class="w-full my-4 font-sans text-left font-bold leading-tight text-xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Driving change: travel in the 21<sup>st</sup> century</a></h3>
                    <aside role="complementary" class="w-full">
                      <h4 id="featured-author-1" class="sr-only no-print">Article information:</h4>
                      <ul aria-labelledby="featured-author-1" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                        <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Electric Vehicles</a></li>
                        <li class="inline-block">8 min read</li>
                      </ul>
                    </aside>
                  </article>
                </li>
                <li class="block line-after my-3">
                  <article class="">
                    <h3 class="w-full my-4 font-sans text-left font-bold leading-tight text-xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Memo to Boris: scrap the monumental waste that is HS2</a></h3>
                    <aside role="complementary" class="w-full">
                      <h4 id="featured-author-2" class="sr-only no-print">Article information:</h4>
                      <ul aria-labelledby="featured-author-2" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                        <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Public Transport</a></li>
                        <li class="inline-block">10 min read</li>
                      </ul>
                    </aside>
                  </article>
                </li>
                <li class="block line-after my-3">
                  <article>
                    <h3 class="w-full my-4 font-sans text-left font-bold leading-tight text-xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Re-think of side road junction layouts needed to ensure priority for pedestrians</a></h3>
                    <aside role="complementary" class="w-full">
                      <h4 id="featured-author-3" class="sr-only no-print">Article information:</h4>
                      <ul aria-labelledby="featured-author-3" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                        <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Pedestrians</a></li>
                        <li class="inline-block">5 min read</li>
                      </ul>
                    </aside>
                  </article>
                </li>
                <li class="block line-after my-3">
                  <article>
                    <h3 class="w-full my-4 font-sans text-left font-bold leading-tight text-xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Franchising or partnership: which is the better route to make bus services flourish?</a></h3>
                    <aside role="complementary" class="w-full">
                      <h4 id="featured-author-4" class="sr-only no-print">Article information:</h4>
                      <ul aria-labelledby="featured-author-4" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                        <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Public Transport</a></li>
                        <li class="inline-block">7 min read</li>
                      </ul>
                    </aside>
                  </article>
                </li>
                <li class="block line-after my-3">
                  <article>
                    <h3 class="w-full my-4 font-sans text-left font-bold leading-tight text-xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Politicians: work in progress</a></h3>
                    <aside role="complementary" class="w-full">
                      <h4 id="featured-author-5" class="sr-only no-print">Article information:</h4>
                      <ul aria-labelledby="featured-author-5" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                        <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Urban Movement</a></li>
                        <li class="inline-block">5 min read</li>
                      </ul>
                    </aside>
                  </article>
                </li>
                <li class="block line-after my-3">
                  <article>
                    <h3 class="w-full my-4 font-sans text-left font-bold leading-tight text-xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Footways are no place for EV charging cables</a></h3>
                    <aside role="complementary" class="w-full">
                      <h4 id="featured-author-6" class="sr-only no-print">Article information:</h4>
                      <ul aria-labelledby="featured-author-6" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                        <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Electric Vehicles</a></li>
                        <li class="inline-block">3 min read</li>
                      </ul>
                    </aside>
                  </article>
                </li>
                <li class="block my-3">
                  <article>
                    <h3 class="w-full my-4 font-sans text-left font-bold leading-tight text-xl"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Where does the public fit in to Bristol’s transport priorities?</a></h3>
                    <aside role="complementary" class="w-full">
                      <h4 id="featured-author-7" class="sr-only no-print">Article information:</h4>
                      <ul aria-labelledby="featured-author-7" class="ltt-text-gray font-serif font-light md:font-medium leading-loose md:leading-normal text-sm pl-0 list-none">
                        <li class="pr-6 inline-block"><a class="ltt-text-red no-underline hover:underline focus:underline" href="#">Transport Infrastructure</a></li>
                        <li class="inline-block">2 min read</li>
                      </ul>
                    </aside>
                  </article>
                </li>-->
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
//import slugify from '~/plugins/slugify.js'

export default {
  data: function () {
    return {
      displayHero: true,
      latestEditorials: this.$store.getters['editorials/retrieveAllEditorials'],
      featuredAuthorEditorials: this.$store.getters['editorials/retrieveAuthorEditorials']('Phil Goodwin')
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

  methods: {
    dayjsNuxt(timestamp, format) {
      return dayjs(String(timestamp)).format(String(format))
    },

    slugify(string) {
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
    }
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
