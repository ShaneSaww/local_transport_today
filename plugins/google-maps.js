import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAyoB81Zjol7Ra_5FZW7nOmMEh3mL-94o8',
    libraries: 'places'
  }
})
