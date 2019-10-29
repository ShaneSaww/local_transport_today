
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
  async retrieveActivities({commit}) {
    await axios.post('https://crm.grouptravelorganiser.com/api/collections/get/Show_Activities?token=19bf867a17a69bb1600440a1fbbf4f',
      JSON.stringify({
        filter: { Event: 'Northern Travel Show', Active: true },
        sort: {Title:1},
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
