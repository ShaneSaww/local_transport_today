
import axios from 'axios'
import helperMd5 from '~/assets/js/md5.js'
import helperEstimateReadingTime from '~/assets/js/reading-time.js'

export const state = () => ({
  editorials: []
})

export const getters = {
  retrieveEditorial: (state) => (slug) => {
    return state.editorials.find(x => x.slug === slug)
  },

  retrieveBookmarkedEditorials: (state) => (bookmarks) => {

    let bookmaredEditorials = []

    if (bookmarks.length > 0) {
      for (let i = 0; i < bookmarks.length; i++) {
        let bookmark = state.editorials.find(x => x.md5 === bookmarks[i])
        if (bookmark) {
          bookmaredEditorials.push(bookmark)
        }
      }
    }

    return bookmaredEditorials
  },

  retrieveAllEditorials: (state) => {
    return state.editorials
  },

  retrieveAuthorEditorials: (state) => (author) => {
    return state.editorials.filter(x => x.author === author)
  },

  retrieveCategoryEditorials: (state) => (category) => {
    return state.editorials.filter(x => x.categories.includes(category))
  }
}

export const mutations = {
  UPDATE_EDITORIALS(state, payload) {
    state.editorials = payload
  }
}

export const actions = {
  async retrieveEditorials({ state, commit }) {
    const context = await require.context('~/assets/content/editorials/', false, /\.json$/)

    function estimateReadingTime (articleBody) {
      return helperEstimateReadingTime.estimateReadingTime(articleBody)
    }

    function md5 (string) {
      return helperMd5.md5(string)
    }

    const allEditorials = await context.keys().map(key => ({
      ...context(key),
      slug: `${key.replace('.json', '').replace('./', '')}`,
      md5: md5(`${key.replace('.json', '').replace('./', '')}`),
      estimatedReadingTimeMinutes: estimateReadingTime(context(key).body)
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

    let publishedEditorials = allEditorials.filter(x => x.published === true)

    commit('UPDATE_EDITORIALS', publishedEditorials)
  }

  /*async retrieveEditorials({commit}, { url, tag, limit }) {
    await axios.post(url,
      JSON.stringify({
        filter: { published: true, tags: { $has: tag } },
        sort: {datePublished:1},
        limit: limit,
        populate: 1
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => {
        if (response.status === 200) {
          let activities = []

          for (let activity of response.data.entries) {
            let entry = {
              id: activity._id,
              name: activity.Title,
              description: activity.Description,
              dateStart: activity.Date_Start,
              timeStart: activity.Time_Start,
              dateEnd: activity.Date_End,
              timeEnd: activity.Time_End,
              capacity: activity.Capacity,
              deposit: activity.Deposit
            }

            activities.push(entry)
          }

          commit('UPDATE_ACTIVITIES', activities)
        }
      }
    )
  }*/
}
