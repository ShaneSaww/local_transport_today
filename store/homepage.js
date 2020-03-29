
import axios from 'axios'

export const state = () => ({
  activities: []
})

export const mutations = {
  UPDATE_ACTIVITIES(state, payload) {
    state.activities = payload
  }
}

export const actions = {
  async retrieveEditorials({commit}, { url, tag, limit }) {
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
  }
}
