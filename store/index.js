
import axios from 'axios'

/*export const state = () => ({
  activities: []
})

export const mutations = {
  UPDATE_ACTIVITIES(state, payload) {
    state.activities = payload
  }
}*/

export const actions = {
  async nuxtServerInit({ dispatch }) { // nuxtServerInit is only called from the server-side (or SSR build time) and can only be declared in index.js
    await dispatch('settings/retrieveSettings')
    await dispatch('editorials/retrieveEditorials')
  }
}
