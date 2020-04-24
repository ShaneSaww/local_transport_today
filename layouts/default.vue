<template>
  <div>
    <nuxt/>
    <page-footer/>
  </div>
</template>

<style>

  .page-enter-active, .page-leave-active {
    transition: opacity .5s;
  }

  .page-enter, .page-leave-to {
    opacity: 0;
  }

  .menu-header .nuxt-link-active, .menu-header .nuxt-link-active:before, .menu-header .nuxt-link-active:after {
    background-color: #C21136;
  }

  .menu-header .nuxt-link-active {
    color: #ffffff;
  }

  /*.expand-enter-active,
  .expand-leave-active {
    transition: height 1s ease-in-out;
    overflow: hidden;
  }

  .expand-enter,
  .expand-leave-to {
    height: 0;
  }*/

  .leaflet-grab {
    cursor: move !important; /* much cleaner than Window's cursor verson of 'grab' */
  }

  /*.leaflet-touch .leaflet-bar a {
    line-height: 27px !important;
  }

  .leaflet-touch .leaflet-control-layers, .leaflet-touch .leaflet-bar {
    border-width: 0 !important;
  }

  .leaflet-top {
    top: -8px !important;
  }

  .leaflet-left {
    left: 7px !important;
  }

  .leaflet-bar {
    box-shadow: none !important;
  }

  .leaflet-control-zoom a {
    box-shadow: 0 1px 5px rgba(0,0,0,0.65) !important;
  }

  .leaflet-bar a {
    border-radius: 4px !important;
    background-color: #a60f29 !important;
    border-width: 2px !important;
    border-style: solid !important;
    border-color: rgba(255, 255, 255, .4) !important;
    color: #FFFFFF !important;
  }

  .leaflet-bar a:last-child {
    border-width: 2px !important;
    border-style: solid !important;
    border-color: rgba(255, 255, 255, .4) !important;
  }

  .leaflet-bar a:hover {
    background-color: #c51230 !important;
    border-width: 2px !important;
    border-style: solid !important;
    border-color: rgba(255, 255, 255, .4) !important;
    color: #FFFFFF !important;
  }

  .leaflet-control-zoom-in {
    margin-top: 10px !important;
  }

  .leaflet-control-zoom-out {
    margin-top: 15px !important;
  }*/
</style>

<script>
import PageFooter from '~/components/PageFooter.vue'

export default {

  components: {
    PageFooter
  },

  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather:300,300i,400,400i,700,700i,900,900i&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather+Sans:300,300i,400,400i,700,700i,800,800i&display=swap' }
      ]
    }
  }

  //name: 'TransitionExpand',
  /*methods: {
    enter(element) {
      const width = getComputedStyle(element).width;

      element.style.width = width;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.style.height = 'auto';

      const height = getComputedStyle(element).height;

      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height;

      // Trigger the animation.
      // We use `setTimeout` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
    leave(element) {
      const height = getComputedStyle(element).height;

      element.style.height = height;

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height;

      setTimeout(() => {
        element.style.height = 0;
      });
    }
  },*/

}
</script>
