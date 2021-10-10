<template>
  <div>
    <page-header :displayHero="displayHero" :pageName="articleSlug" />
    <div role="main" id="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
      <article role="article" class="mt-10 mx-6 lg:mx-4 max-w-sm md:max-w-lg">
        <aside v-if="article.categories.length > 0" role="complementary">
          <h4 id="continue-discussion-title" class="ltt-text-gray mt-6 md:mb-4 pr-1 md:mb-6 font-serif font-light md:font-medium text-sm md:text-base block md:inline-block leading-loose">Continuing the discussion of:</h4>
          <ul role="list" aria-labelledby="continue-discussion-title" class="pl-0 mb-8 md:mb-0 list-none block md:inline-block font-serif font-light md:font-medium leading-loose text-sm md:text-base">
            <li v-for="(category, key) in article.categories" class="pr-3 inline-block"><nuxt-link :to="'/category/' + slugify(category) + '/'" class="ltt-text-red no-underline hover:underline focus:underline">{{ category }}</nuxt-link></li>
          </ul>
        </aside>
        <h1 itemprop="title" class="font-sans font-extrabold leading-tight md:leading-tighter ltt-text-red mb-4 text-4xl md:text-6xl lg:mt-0">{{ article.headline }}</h1>
        <aside role="complementary">
          <h4 id="article-meta-title" class="sr-only no-print">Article information:</h4>
          <ul role="list" aria-labelledby="article-meta-title" class="ltt-text-gray font-serif font-light md:font-medium leading-loose text-sm md:text-base pl-0 my-6 list-none">
            <li class="pr-4 lg:pr-8 inline-block">Viewpoint by <nuxt-link :to="'/author/' + slugify(article.author) + '/'" itemprop="author" rel="author" class="ltt-text-red no-underline hover:underline focus:underline">{{ article.author }}</nuxt-link></li>
            <li class="pr-4 lg:pr-8 inline-block"><time itemprop="pubdate" :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
            <li :aria-label="article.estimatedReadingTimeMinutes + ' minute read'" class="pr-4 lg:pr-8 inline-block">{{ article.estimatedReadingTimeMinutes }} min read</li>
            <li v-if="article.issue" class="inline-block">Featured inside <abbr title="Local Transport Today">LTT</abbr> issue № {{ article.issue }}</li>
          </ul>
        </aside>
        <div v-html="parseMarkdown(article.body)" class="dropcap content-text-spacing font-serif text-gray-333 leading-normal text-base md:text-xl lg:text-2xl"></div>
        <div class="no-print border-t border-solid border-light-gray mt-8 py-4 flex flex-row justify-between">
          <aside role="complementary">
            <h4 id="share-social-media-title" class="sr-only">Share on social media:</h4>
            <ul role="list" aria-labelledby="share-social-media-title" class="pl-0 mb-8 md:mb-0 list-none inline-block">
              <li class="block md:inline-block mb-4 md:mb-0 ml-6">
                <a :href="'https://twitter.com/intent/tweet?url=' + this.homepageURL + '/' + article.slug + '/&text=' + article.headline" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Tweet<span class="sr-only"> on Twitter</span></span></a>
              </li>
              <li class="block md:inline-block mb-4 md:mb-0 ml-6">
                <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + this.homepageURL + '/' + article.slug + '/'" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"/></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Like<span class="sr-only"> on Facebook</span></span></a>
              </li>
              <li class="block md:inline-block mb-4 md:mb-0 ml-6">
                <a :href="'https://www.linkedin.com/shareArticle?mini=true&url=' + this.homepageURL + '/' + article.slug + '/&source=&title=' + article.headline" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Share<span class="sr-only"> on Linked In</span></span></a>
              </li>
              <li class="block md:inline-block mb-4 md:mb-0 ml-6">
                <a :href="'https://api.whatsapp.com/send?text=' + article.headline + ' - ' + this.homepageURL + '/' + article.slug + '/'" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 1512.938 1512.75" xmlns="http://www.w3.org/2000/svg"><path d="M1512.937 733.174c0-202.44-82.659-385.735-216.295-518.431C1163.02 82.065 978.472 0 774.675 0 570.702 0 386.064 82.037 252.38 214.644 118.64 347.31 35.94 530.57 35.94 732.919c0 67.924 9.394 133.838 26.923 196.482 17.417 62.242 42.897 121.174 75.197 175.567L10.115 1482.874 0 1512.75l30.053-9.563 393.525-125.235c52.1 28.039 107.843 50.008 166.363 64.98 58.96 15.083 120.752 23.093 184.498 23.093 203.883 0 388.464-82.04 522.111-214.642 133.703-132.659 216.388-315.9 216.388-518.21zM425.147 368.152Zm176.738 288.594zm-6.46 21.888c7.198 12.427 25.312 41.923 52.117 75.033 16.562 20.457 36.393 42.259 58.925 62.203 62.993 55.772 118.264 79.62 146.642 91.864 5.609 2.42 10.157 4.384 14.822 6.718 7.3 3.586 12.57 5.157 16.406 4.694 2.763-.333 5.58-2.36 8.848-6.08v-.063c7.653-8.695 25.612-29.4 40.664-47.84 9.504-11.642 18.2-22.76 23.136-30.175l.03.02c9.83-14.888 20.432-21.148 32.587-22.52 10.72-1.208 20.72 1.91 32.197 6.031 8.159 2.928 28.763 12.345 51.95 23.307 35.884 16.962 77.863 37.487 89.997 43.658l-.01.02c3.187 1.544 6.503 3.109 9.607 4.575 17.597 8.307 29.327 13.847 36.11 25.019l.062.063c4.46 7.451 6.848 26.739 3.832 51.253-2.077 16.875-6.556 37.378-14.476 59.447-8.877 24.683-32.065 48.125-58.628 66.674-32.02 22.36-70.072 38.285-93.332 40.47-5.166.477-9.939 1.633-14.83 2.817-28.723 6.95-60.88 14.732-238.59-54.612-195.89-76.51-324.749-264.971-352.779-305.966-2.38-3.483-3.992-5.84-4.429-6.403l-.125-.125-.103-.136.04-.03c-11.153-14.699-87.05-114.79-87.05-220.038 0-100.336 49.702-152.58 72.502-176.547 1.143-1.201 2.197-2.308 3.594-3.819 9.582-10.528 20.053-17.68 30.202-22.43 13.684-6.406 26.68-8.385 36.223-8.385 7.176 0 14.771.481 22.088.945 5.851.371 11.498.73 17.244.73 1.392 0 2.434-.07 3.516-.14 16.467-1.07 37.935-2.465 57.36 43.847 2.061 4.913 12.577 30.31 23.602 56.941 17.248 41.657 35.962 86.854 39.202 93.384l-.023.012c3.315 6.491 6.033 13.738 6.874 21.858.903 8.724-.34 18.037-5.196 27.825l-.062.061a721.571 721.571 0 0 0-2.984 6.045c-5.524 11.282-9.615 19.642-19.487 31.121l-.063.063c-4.054 4.67-7.39 8.68-10.723 12.687-7.319 8.797-14.614 17.564-21.059 24.001l.03.034c-5.829 5.83-12.14 12.146-6.46 21.889z"/></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Send<span class="sr-only"> on Whats App</span></span></a>
              </li>
              <li class="block md:inline-block mb-4 md:mb-0 ml-6">
                <a :href="'https://getpocket.com/save?url=' + this.homepageURL + '/' + article.slug + '/'" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.813 10.259l-5.646 5.419c-.32.305-.73.458-1.141.458-.41 0-.821-.153-1.141-.458l-5.646-5.419c-.657-.628-.677-1.671-.049-2.326.63-.657 1.671-.679 2.325-.05l4.511 4.322 4.517-4.322c.66-.631 1.697-.607 2.326.049.631.645.615 1.695-.045 2.326l-.011.001zm5.083-7.546c-.299-.858-1.125-1.436-2.041-1.436H2.179c-.9 0-1.717.564-2.037 1.405-.094.25-.142.511-.142.774v7.245l.084 1.441c.348 3.277 2.047 6.142 4.682 8.139.045.036.094.07.143.105l.03.023c1.411 1.03 2.989 1.728 4.694 2.072.786.158 1.591.24 2.389.24.739 0 1.481-.067 2.209-.204.088-.029.176-.045.264-.06.023 0 .049-.015.074-.029 1.633-.36 3.148-1.036 4.508-2.025l.029-.031.135-.105c2.627-1.995 4.324-4.862 4.686-8.148L24 10.678V3.445c0-.251-.031-.5-.121-.742l.017.01z"/></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Pocket<span class="sr-only"> this bookmark</span></span></a>
              </li>
            </ul>
          </aside>
          <aside role="complementary">
            <h4 id="share-social-media-title" class="sr-only">Keep forever:</h4>
            <ul role="list" aria-labelledby="share-social-media-title" class="pl-0 mb-8 md:mb-0 list-none inline-block">
              <!-- <li class="block md:inline-block mb-4 md:mb-0 mr-6">
                <button @click="toggle(article.md5)" :class="bookmarked(article.md5) ? 'ani-sparkle-once': ''" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path :d="bookmarked(article.md5) ? 'M 17,3 H 7 C 5.9,3 5,3.9 5,5 v 16 l 7,-3 7,3 V 5 C 19,3.9 18.1,3 17,3 Z': 'M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z'" /></svg><span aria-live="polite" aria-atomic="true" aria-relevant="text" class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">{{ bookmarked(article.md5) ? 'Bookmarked': 'Bookmark' }}</span></button>
              </li> -->
              <li class="block md:inline-block mb-4 md:mb-0 mr-6">
                <a class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" :href="'mailto:?subject=' + article.headline + '&body=' + this.homepageURL + '/' + article.slug + '/'"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 229.66 229.66" xmlns="http://www.w3.org/2000/svg"><g transform="translate(288.87 -28.254)"><path d="m-272.85 223.12c-7.2498-1.0772-13.345-6.668-15.407-14.132-0.58413-2.1145-0.62245-6.1736-0.62245-65.93 0-59.756 0.0383-63.815 0.62245-65.93 1.7586-6.3659 6.1622-11.131 12.394-13.411l2.5054-0.91663h99.131c95.225 0 99.213 0.0255 101.23 0.64847 6.2047 1.9145 10.844 6.3943 12.958 12.514l0.81552 2.3602v64.735c0 62.538-0.0226 64.801-0.66614 66.675-1.1473 3.3418-2.2684 5.2105-4.6238 7.7074-2.3674 2.5095-4.8337 4.0632-8.292 5.2235-1.8662 0.62615-5.6859 0.65284-100.01 0.69895-53.94 0.0264-98.955-0.0833-100.03-0.24362zm190.07-13.614c0.19708-0.59124-59.382-55.158-60.225-55.158-0.38921 0-2.9064 2.0073-5.7798 4.6091-6.1944 5.6087-8.1328 7.0839-11.33 8.6224-4.1295 1.9872-7.1915 2.6937-12.524 2.8894-5.9672 0.21905-10.066-0.53215-14.666-2.6876-3.7642-1.764-5.2439-2.8654-11.616-8.6466-2.7164-2.4645-5.2149-4.6337-5.5522-4.8205-0.49798-0.2757-1.2607 0.24913-4.0569 2.7916-26.314 23.925-56.385 51.778-56.473 52.307-0.11093 0.66408 1.4133 0.67391 90.987 0.58653 68.112-0.0665 91.134-0.19093 91.235-0.49334zm-161.92-37.516c16.254-15.132 29.599-27.803 29.657-28.157 0.12807-0.79099-58.526-54.08-59.791-54.322l-0.81453-0.1557v55.074c0 54.648 5e-3 55.074 0.69829 55.074 0.43728 0 11.744-10.284 30.251-27.514zm172.38 26.72c0.28114-1.0491 0.27639-107.45-5e-3 -108.5-0.14339-0.53533-0.43734-0.77588-0.8622-0.70556-0.35454 0.0587-13.55 11.805-29.323 26.103-33.573 30.434-30.688 27.762-30.529 28.275 0.23528 0.7557 59.346 55.611 59.93 55.615 0.31691 2e-3 0.67194-0.35334 0.78893-0.78991zm-98.203-43.061c2.2997-0.9474 5.4392-3.0314 8.5776-5.694 6.7422-5.7198 79.458-72.667 79.553-73.242 0.11114-0.67151-1.1783-0.68112-91.437-0.68112-60.495 0-91.623 0.11936-91.767 0.35187-0.11961 0.19353 0.46633 1.0525 1.3021 1.9088 1.2132 1.243 64.175 58.91 75.684 69.319 6.3648 5.7566 11.472 8.8615 14.549 8.8454 0.87859-5e-3 2.4706-0.36806 3.5377-0.80769z"/></g></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Send<span class="sr-only"> via email</span></span></a>
              </li>
              <li class="block md:inline-block mb-4 md:mb-0 mr-6">
                <a class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" href="javascript:window.print();"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 482.5 482.5" xmlns="http://www.w3.org/2000/svg"><path d="m399.25 98.9h-12.4v-27.6c0-39.3-32-71.3-71.3-71.3h-149.7c-39.3 0-71.3 32-71.3 71.3v27.6h-11.3c-39.3 0-71.3 32-71.3 71.3v115c0 39.3 32 71.3 71.3 71.3h11.2v90.4c0 19.6 16 35.6 35.6 35.6h221.1c19.6 0 35.6-16 35.6-35.6v-90.4h12.5c39.3 0 71.3-32 71.3-71.3v-115c0-39.3-32-71.3-71.3-71.3zm-277.8-27.6c0-24.4 19.9-44.3 44.3-44.3h149.6c24.4 0 44.3 19.9 44.3 44.3v27.6h-238.2v-27.6zm238.3 375.8c0 4.7-3.9 8.6-8.6 8.6h-221.1c-4.7 0-8.6-3.9-8.6-8.6v-149.1h238.3v149.1zm83.8-161.8c0 24.4-19.9 44.3-44.3 44.3h-12.4v-31.6h17.8c7.5 0 13.5-6 13.5-13.5s-6-13.5-13.5-13.5h-330c-7.5 0-13.5 6-13.5 13.5s6 13.5 13.5 13.5h19.9v31.6h-11.3c-24.4 0-44.3-19.9-44.3-44.3v-115c0-24.4 19.9-44.3 44.3-44.3h316c24.4 0 44.3 19.9 44.3 44.3v115z"/><path d="m154.15 364.4h171.9c7.5 0 13.5-6 13.5-13.5s-6-13.5-13.5-13.5h-171.9c-7.5 0-13.5 6-13.5 13.5s6.1 13.5 13.5 13.5z"/><path d="m327.15 392.6h-172c-7.5 0-13.5 6-13.5 13.5s6 13.5 13.5 13.5h171.9c7.5 0 13.5-6 13.5-13.5s-6-13.5-13.4-13.5z"/><path d="m398.95 151.9h-27.4c-7.5 0-13.5 6-13.5 13.5s6 13.5 13.5 13.5h27.4c7.5 0 13.5-6 13.5-13.5s-6-13.5-13.5-13.5z"/></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Print</span></a>
              </li>
            </ul>
          </aside>
        </div>
        <aside role="complementary" class="author flex flex-col md:flex-row md:justify-between md:flex-row-reverse border-t border-solid border-light-gray py-8 px-6">
          <div class="author-photo md:w-1/3">
            <figure v-if="author.photo">
              <img loading="lazy" width="350" height="350" class="notch max-w-full" :src="author.photo" :alt="author.name" :title="author.name" />
            </figure>
          </div>
          <div class="author-bio md:w-2/3">
            <h2 class="mb-8 mt-3 md:mt-0 text-center text-xl md:text-2xl md:text-left"><span class="sr-only">Author: </span><nuxt-link :to="'/author/' + slugify(article.author) + '/'" class="red-block block md:inline-block">{{ author.name }}</nuxt-link></h2>
            <p class="font-serif text-gray-333 leading-normal text-base md:text-xl md:pl-2 md:pr-8">{{ author.bio }}</p>
            <h4 id="author-social-media-title" class="sr-only no-print">Contact {{ author.name }}:</h4>
            <ul role="list" aria-labelledby="author-social-media-title" class="no-print pl-0 md:pl-2 pt-4 list-none inline-block">
              <li v-if="author.email" class="block md:inline-block mb-4 md:mb-0 mr-6">
                <a :href="'mailto:' + author.email" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 229.66 229.66" xmlns="http://www.w3.org/2000/svg"><g transform="translate(288.87 -28.254)"><path d="m-272.85 223.12c-7.2498-1.0772-13.345-6.668-15.407-14.132-0.58413-2.1145-0.62245-6.1736-0.62245-65.93 0-59.756 0.0383-63.815 0.62245-65.93 1.7586-6.3659 6.1622-11.131 12.394-13.411l2.5054-0.91663h99.131c95.225 0 99.213 0.0255 101.23 0.64847 6.2047 1.9145 10.844 6.3943 12.958 12.514l0.81552 2.3602v64.735c0 62.538-0.0226 64.801-0.66614 66.675-1.1473 3.3418-2.2684 5.2105-4.6238 7.7074-2.3674 2.5095-4.8337 4.0632-8.292 5.2235-1.8662 0.62615-5.6859 0.65284-100.01 0.69895-53.94 0.0264-98.955-0.0833-100.03-0.24362zm190.07-13.614c0.19708-0.59124-59.382-55.158-60.225-55.158-0.38921 0-2.9064 2.0073-5.7798 4.6091-6.1944 5.6087-8.1328 7.0839-11.33 8.6224-4.1295 1.9872-7.1915 2.6937-12.524 2.8894-5.9672 0.21905-10.066-0.53215-14.666-2.6876-3.7642-1.764-5.2439-2.8654-11.616-8.6466-2.7164-2.4645-5.2149-4.6337-5.5522-4.8205-0.49798-0.2757-1.2607 0.24913-4.0569 2.7916-26.314 23.925-56.385 51.778-56.473 52.307-0.11093 0.66408 1.4133 0.67391 90.987 0.58653 68.112-0.0665 91.134-0.19093 91.235-0.49334zm-161.92-37.516c16.254-15.132 29.599-27.803 29.657-28.157 0.12807-0.79099-58.526-54.08-59.791-54.322l-0.81453-0.1557v55.074c0 54.648 5e-3 55.074 0.69829 55.074 0.43728 0 11.744-10.284 30.251-27.514zm172.38 26.72c0.28114-1.0491 0.27639-107.45-5e-3 -108.5-0.14339-0.53533-0.43734-0.77588-0.8622-0.70556-0.35454 0.0587-13.55 11.805-29.323 26.103-33.573 30.434-30.688 27.762-30.529 28.275 0.23528 0.7557 59.346 55.611 59.93 55.615 0.31691 2e-3 0.67194-0.35334 0.78893-0.78991zm-98.203-43.061c2.2997-0.9474 5.4392-3.0314 8.5776-5.694 6.7422-5.7198 79.458-72.667 79.553-73.242 0.11114-0.67151-1.1783-0.68112-91.437-0.68112-60.495 0-91.623 0.11936-91.767 0.35187-0.11961 0.19353 0.46633 1.0525 1.3021 1.9088 1.2132 1.243 64.175 58.91 75.684 69.319 6.3648 5.7566 11.472 8.8615 14.549 8.8454 0.87859-5e-3 2.4706-0.36806 3.5377-0.80769z"/></g></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Email</span></a>
              </li>
              <li v-if="author.twitter" class="block md:inline-block mb-4 md:mb-0 mr-6">
                <a :href="author.twitter" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">Twitter</span></a>
              </li>
              <!-- <li v-if="author.linkedin" class="block md:inline-block mb-4 md:mb-0">
                <a :href="author.linkedin" class="leading-none text-sm no-underline ltt-text-gray hover:text-gray-333 focus:text-gray-333" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" focusable="false" role="img" class="fill-current h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg><span class="pl-2 align-text-bottom font-serif font-light md:font-medium leading-normal text-base ltt-text-red no-underline hover:underline focus:underline">LinkedIn</span></a>
              </li> -->
            </ul>
          </div>
        </aside>
      </article>
      <section v-if="article.allowComments && devStatus === 'production'" id="comments" class="no-print font-serif w-full mx-6 mb-8 lg:mx-4 max-w-sm md:max-w-lg border-t border-solid border-light-gray">
        <h2 class="font-sans font-extrabold text-left leading-tight md:leading-tighter ltt-text-red mt-8 mb-4 text-xl md:text-2xl">Feedback and Contributions</h2>
        <p class="text-gray-333 mb-4">Login using social media or create an account to join the discussion with {{ author.name }}.</p>
        <script defer
          src="https://cdn.commento.io/js/commento.js"
          :data-css-override="homepageURL + '/commento.css'"
          data-no-fonts="true"
          data-auto-init="true"
          :data-page-id="'/' + article.slug + '/'">
        </script>
        <div id="commento" class="font-serif text-gray-333 leading-normal text-base md:text-xl"></div>
      </section>
      <section v-if="authorEditorials.length > 0" id="further-contributions" class="no-print w-full mx-6 lg:mx-4 max-w-sm md:max-w-lg border-t border-solid border-light-gray">
        <h2 class="font-sans font-extrabold text-left leading-tight md:leading-tighter ltt-text-red my-8 text-xl md:text-2xl">Further contributions from {{ article.author }}</h2>
        <div class="flex flex-col md:flex-row md:flex-wrap md:justify-between">
          <article v-for="(article, key) in authorEditorials" v-if="key <= 1" role="article" class="flex-basis-100 md:flex-basis-50 -mx-4 border-light-gray border border-solid p-4 mb-4 md:mb-8 flex flex-col justify-between">
            <div>
              <aside role="complementary" class="w-full">
                <h4 :id="'article-links-title-' + article.md5" class="sr-only no-print">Article Links:</h4>
                <ul role="list" :aria-labelledby="'article-links-title-' + article.md5" class="flex flex-wrap flex-row justify-between content-around ltt-text-gray font-serif font-light md:font-medium leading-loose text-base pl-0 list-none">
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
              <h3 class="w-full my-4 font-sans text-left font-extrabold leading-tight text-2xl md:text-2xl"><nuxt-link rel="bookmark" class="ltt-headline no-underline hover:underline focus:underline" :to="'/' + article.slug + '/'">{{ article.headline }}</nuxt-link></h3>
              <p class="w-full font-serif mb-4 text-left text-gray-333 leading-normal text-base">{{ article.subHeadline }}</p>
            </div>
            <div>
              <aside role="complementary" class="w-full">
                <h4 :id="'article-meta-title-' + article.md5" class="sr-only no-print">Article information:</h4>
                <ul role="list" :aria-labelledby="'article-meta-title-' + article.md5" class="text-sm ltt-text-gray font-serif font-light md:font-medium leading-loose pl-0 list-none">
                  <li class="pr-8 inline-block"><nuxt-link rel="author" class="ltt-text-red no-underline hover:underline focus:underline" :to="'/author/' + slugify(article.author) + '/'">{{ article.author }}</nuxt-link></li>
                  <li class="pr-8 inline-block"><time :datetime="article.datePublished" :aria-label="dayjsNuxt(article.datePublished, 'D MMMM YYYY')">{{ dayjsNuxt(article.datePublished, 'D MMM YYYY') }}</time></li>
                  <!-- <li class="inline-block" :aria-label="article.estimatedReadingTimeMinutes + ' minute read'">{{ article.estimatedReadingTimeMinutes }} min read</li> -->
                </ul>
              </aside>
            </div>
          </article>
        </div>
      </section>
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
      articleSlug: this.$route.params.editorial,
      homepageURL: pkg.homepageURL,
      devStatus: process.env.NODE_ENV
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

    let article, author, authorEditorials

    if (payload) {
      article = payload.editorial
      author = payload.author
      authorEditorials = payload.authorEditorials
    }
    else {

      let contextEditorials = await require.context('~/assets/content/editorials/', false, /\.json$/)

      let allEditorials = await contextEditorials.keys().map(key => ({
        ...contextEditorials(key),
        slug: `${key.replace('.json', '').replace('./', '')}`,
      }))

      let contextAuthors = await require.context('~/assets/content/authors/', false, /\.json$/)

      let allAuthors = await contextAuthors.keys().map(key => ({
        ...contextAuthors(key),
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

      article = await require(`~/assets/content/editorials/${params.editorial}.json`)

      authorEditorials = allEditorials.filter(x => x.published === true && x.author === article.author && x.slug != params.editorial)
      let authorFilter = allAuthors.filter(x => x.name === article.author)
      author = authorFilter[0]
    }

    article = {
      ...article,
      slug: `${params.editorial}`,
      md5: md5(`${params.editorial}`),
      estimatedReadingTimeMinutes: estimateReadingTime(article.body)
    }

    return {
      article,
      author,
      authorEditorials
    }
  },

  mounted() {
    //this.updateBookmarkState()
  },

  computed: {
    // settingsHeader () {
    //   return this.$store.getters['settings/retrieveSetting']('header')
    // },

    // author () {
    //   return this.$store.getters['authors/retrieveAuthor'](this.slugify(this.article.author))
    // },

    // authorEditorials () {
    //   let allEditorialsForAuthor = this.$store.getters['editorials/retrieveAuthorEditorials'](this.article.author)
    //   return allEditorialsForAuthor.filter(x => x.md5 != this.article.md5) // omit currently viewed article from list
    // }
  },

  methods: {
    dayjsNuxt (timestamp, format) {
      return dayjs(String(timestamp)).format(String(format))
    },

    md5 (string) {
      return helperMd5.md5(string)
    },

    slugify (string) {
      return helperSlugify.slugify(string)
    },

    estimateReadingTime (articleBody) {
      return helperEstimateReadingTime.estimateReadingTime(articleBody)
    },

    parseMarkdown (content) {
      return helperMarkdown.parseMarkdown(content)
    },

    // bookmarked (articleMd5) {
    //   return this.$store.getters['bookmarks/checkBookmark'](articleMd5)
    // },

    // ...mapMutations({
    //   toggle: 'bookmarks/TOGGLE_BOOKMARK',
    //   updateBookmarkState: 'bookmarks/UPDATE_BOOKMARKS'
    // })
  },

  head() {
    let meta = []

    let keywords = {
      hid: 'keywords',
      property: 'keywords',
      content: this.article.author + ', ' + this.article.categories.join(', ')
    }
    meta.push(keywords)

    let ogUrl = {
      hid: 'og-url',
      property: 'og:url',
      content: pkg.homepageURL + '/' + this.articleSlug + '/'
    }
    meta.push(ogUrl)

    let ogTitle = {
      hid: 'og-title',
      property: 'og:title',
      content: this.article.headline
    }
    meta.push(ogTitle)

    let twitterTitle = {
      hid: 'twitter-title',
      name: 'twitter:title',
      content: this.article.headline
    }
    meta.push(twitterTitle)

    if (this.article.subHeadline) {
      let description = {
        hid: 'description',
        name: 'description',
        content: this.article.subHeadline
      }
      meta.push(description)

      let ogDescription = {
        hid: 'og-description',
        property: 'og:description',
        content: this.article.subHeadline
      }
      meta.push(ogDescription)

      let twitterDescription = {
        hid: 'twitter-description',
        name: 'twitter:description',
        content: this.article.subHeadline
      }
      meta.push(twitterDescription)
    }

    let structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pkg.homepageURL + '/' + this.article.slug + '/'
        },
        "headline": this.article.headline,
        "image": [
          pkg.homepageURL + "/local_transport_today_og_image_white.png"
         ],
        "datePublished": this.article.datePublished,
        "dateModified": this.article.datePublished,
        "author": {
          "@type": "Person",
          "name": this.article.author
        },
         "publisher": {
          "@type": "Organization",
          "name": pkg.description,
          "logo": {
            "@type": "ImageObject",
            "url": pkg.homepageURL + '/ltt_google_amp.png',
            "height": 60,
            "width": 600
          }
        },
        "description": this.article.subHeadline
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": this.article.author,
          "item": pkg.homepageURL + '/author/' + this.slugify(this.article.author) + '/'
        }]
      }
    ]

    for (let i = 0; i < this.article.categories.length; i++) {
      let breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": this.article.categories[i],
          "item": pkg.homepageURL + '/category/' + this.slugify(this.article.categories[i]) + '/'
        }]
      }
      structuredData.push(breadcrumb)
    }

    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(structuredData), type: 'application/ld+json' }
      ],
      title: this.article.headline + ' - ' + this.article.author + ' - ' + pkg.description,
      meta: meta,
      link: [
        { hid: 'canonical', rel: 'canonical', href: pkg.homepageURL + '/' + this.articleSlug + '/' }
      ]
    }
  }
}
</script>
