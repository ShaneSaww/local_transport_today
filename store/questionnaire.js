
import axios from 'axios'

export const state = () => ({
  groupProfile: [],
  averageNumberPeople: [],
  numberTripsOrganised: [],
  referral: [],
  tripTypes: [],
  travelActivities: []
})

export const mutations = {
  UPDATE_GROUP_PROFILE(state, payload) {
    state.groupProfile = payload
  },

  UPDATE_AVERAGE_NUMBER_PEOPLE(state, payload) {
    state.averageNumberPeople = payload
  },

  UPDATE_NUMBER_TRIPS_ORGANISED(state, payload) {
    state.numberTripsOrganised = payload
  },

  UPDATE_REFERRAL(state, payload) {
    state.referral = payload
  },

  UPDATE_TRIP_TYPES(state, payload) {
    state.tripTypes = payload
  },

  UPDATE_TRAVEL_ACTIVITIES(state, payload) {
    state.travelActivities = payload
  }
}

export const actions = {
  async retrieveQuestionnaire({commit}) {
    await axios.post('https://crm.grouptravelorganiser.com/api/singletons/get/GTO_Questionnaire?token=19bf867a17a69bb1600440a1fbbf4f',
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => {
        if (response.status === 200) {
          let groupProfile = response.data.Group_Profile
          let averageNumberPeople = response.data.Average_Number_People
          let numberTripsOrganised = response.data.Number_Trips_Organised
          let referral = response.data.Referral
          let tripTypes = response.data.Trip_Types
          let travelActivities = response.data.Travel_Activities

          groupProfile.sort()
          averageNumberPeople.sort(function(a, b){return a-b})
          numberTripsOrganised.sort(function(a, b){return a-b})
          referral.sort()
          tripTypes.sort()
          travelActivities.sort()

          groupProfile.push('Other')
          averageNumberPeople.push('N/A')
          numberTripsOrganised.push('N/A')
          referral.push('Other')

          commit('UPDATE_GROUP_PROFILE', groupProfile)
          commit('UPDATE_AVERAGE_NUMBER_PEOPLE', averageNumberPeople)
          commit('UPDATE_NUMBER_TRIPS_ORGANISED', numberTripsOrganised)
          commit('UPDATE_REFERRAL', referral)
          commit('UPDATE_TRIP_TYPES', tripTypes)
          commit('UPDATE_TRAVEL_ACTIVITIES', travelActivities)
        }
      }
    )
  }
}
