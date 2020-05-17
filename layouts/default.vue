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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
    opacity: 0;
  }

  .menu-header .nuxt-link-active, .menu-header .nuxt-link-active:before, .menu-header .nuxt-link-active:after {
    background-color: #C21136;
  }

  .menu-header .nuxt-link-active {
    color: #ffffff;
  }

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
        { rel: 'stylesheet preload', href: 'https://fonts.googleapis.com/css?family=Merriweather:300,300i,400,400i,700,700i,900,900i&display=swap' },
        { rel: 'stylesheet preload', href: 'https://fonts.googleapis.com/css?family=Merriweather+Sans:300,300i,400,400i,700,700i,800,800i&display=swap' }
      ]
    }
  }
}
</script>
