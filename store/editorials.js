
import axios from 'axios'

export const state = () => ({
  editorials: []
})

export const getters = {
  retrieveEditorial: (state) => (slug) => {
    return state.editorials.find(x => x.slug === slug)
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

    function estimateReadingTime(articleBody) {
      let wordCount = articleBody.split(' ').length
      let minutes = wordCount / 120 // typical reading speed of 120 words a minute
      if (minutes < 1) {
        minutes = 1
      }
      return Math.floor(minutes)
    }

    const allEditorials = await context.keys().map(key => ({
      ...context(key),
      slug: `${key.replace('.json', '').replace('./', '')}`,
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