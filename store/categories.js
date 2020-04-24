
import axios from 'axios'

export const state = () => ({
  categories: []
})

export const getters = {
  retrieveCategory: (state) => (category) => {
    return state.categories.find(x => x.slug === category)
  }
}

export const mutations = {
  UPDATE_CATEGORIES(state, payload) {
    state.categories = payload
  }
}

export const actions = {
  async retrieveCategories({ commit }) {

    // Use webpack to search for content matching .json files (false = don't search sub-directories)
    let files = await require.context('~/assets/content/categories/', false, /\.json$/)
    let categories = files.keys().map(key => {
      let res = files(key);
      res.slug = key.slice(2, -5);
      return res;
    })

    await commit('UPDATE_CATEGORIES', categories)
  }
}
