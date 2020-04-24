
import axios from 'axios'

export const state = () => ({
  authors: []
})

export const getters = {
  retrieveAuthor: (state) => (author) => {
    return state.authors.find(x => x.slug === author)
  }
}

export const mutations = {
  UPDATE_AUTHORS(state, payload) {
    state.authors = payload
  }
}

export const actions = {
  async retrieveAuthors({ commit }) {

    // Use webpack to search for content matching .json files (false = don't search sub-directories)
    let files = await require.context('~/assets/content/authors/', false, /\.json$/)
    let authors = files.keys().map(key => {
      let res = files(key);
      res.slug = key.slice(2, -5);
      return res;
    })

    await commit('UPDATE_AUTHORS', authors)
  }
}
