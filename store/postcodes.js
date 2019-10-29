
import axios from 'axios'

export const state = () => ({
  postcodeDistricts: {}
})

export const getters = {
  retrieveDistrictGeolocation: (state) => (district) => {
    return state.postcodeDistricts[district]
  }
}

export const mutations = {
  UPDATE_POSTCODE_DISTRICTS(state, payload) {
    state.postcodeDistricts = payload
  }
}

export const actions = {
  async retrievePostcodeDistricts({commit}) {
    await axios.get('https://crm.grouptravelorganiser.com/api/collections/get/Postcode_Districts?token=19bf867a17a69bb1600440a1fbbf4f',
      JSON.stringify({
        sort: {_created:1},
        populate: 1
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => {
        if (response.status === 200) {
          var districts = {} // this will contain postcode districts with their appropriate geocoordinates

          for (var district of response.data.entries) {

            let geolocation = {
              lat: district.lat,
              lng: district.lng
            }

            let key = district.postcode_area

            districts[key] = geolocation;
          }

          //console.log(districts)

          commit('UPDATE_POSTCODE_DISTRICTS', districts)
        }
      }
    )
  }
}
