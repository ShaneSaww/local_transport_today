
import axios from 'axios'

export const state = () => ({
  settings: []
})

export const getters = {
  retrieveSettings: (state) => (region) => {
    return state.settings.find(x => x.slug === region)
  }
}

export const mutations = {
  UPDATE_SETTINGS(state, payload) {
    state.settings = payload
  }
}

export const actions = {
  async retrieveSettings({ commit }) {

    // Use webpack to search for content matching .json files (false = don't search sub-directories)
    let files = await require.context('~/assets/content/settings/', false, /\.json$/)
    let settings = files.keys().map(key => {
      let res = files(key);
      res.slug = key.slice(2, -5);
      return res;
    })

    //console.log(settings)

    await commit('UPDATE_SETTINGS', settings)
  }
}
