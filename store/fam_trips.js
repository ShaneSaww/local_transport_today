
import axios from 'axios'

export const state = () => ({
  famTrips: []
})

export const mutations = {
  UPDATE_FAM_TRIPS(state, payload) {
    state.famTrips = payload
  }
}

export const actions = {
  async retrieveFamTrips({commit}) {
    await axios.post('https://crm.grouptravelorganiser.com/api/collections/get/Show_Fam_Trips?token=19bf867a17a69bb1600440a1fbbf4f',
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
          let famTrips = []

          for (let famTrip of response.data.entries) {
            let entry = {
              id: famTrip._id,
              name: famTrip.Title,
              description: famTrip.Description,
              dateStart: famTrip.Date_Start,
              timeStart: famTrip.Time_Start,
              dateEnd: famTrip.Date_End,
              timeEnd: famTrip.Time_End,
              capacity: famTrip.Capacity,
              deposit: famTrip.Deposit
            }

            famTrips.push(entry)
          }

          commit('UPDATE_FAM_TRIPS', famTrips)
        }
      }
    )
  }
}
