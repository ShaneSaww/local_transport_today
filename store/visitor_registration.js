
import axios from 'axios'

export const state = () => ({
  visitorKeptUpdated: [],
  visitorNewsletters: [],
  visitorSubscriptions: []
})

export const mutations = {
  UPDATE_VISITOR_UPDATES(state, payload) {
    state.visitorKeptUpdated = payload
  },

  UPDATE_VISITOR_NEWSLETTERS(state, payload) {
    state.visitorNewsletters = payload
  },

  UPDATE_VISITOR_SUBSCRIPTIONS(state, payload) {
    state.visitorSubscriptions = payload
  }
}

export const actions = {
  async retrieveVisitorRegistrationOptions({commit}) {
    await axios.get('https://crm.grouptravelorganiser.com/api/singletons/get/Northern_Visitor_Registration_Form_Fields?token=19bf867a17a69bb1600440a1fbbf4f',
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => {
        if (response.status === 200) {
          let visitorKeptUpdated = []

          for (let item of response.data.Keep_Updated_Email) {
            let option = {
              id: item,
              email: true,
              phone: false
            }
            visitorKeptUpdated.push(option)
          }

          for (let item of response.data.Keep_Updated_Phone) {
            let obj = visitorKeptUpdated.find(x => x.id === item) // locate the object using the same 'id'
            if (obj) {
              let index = visitorKeptUpdated.indexOf(obj) // reveal the 'index' from the correct object
              visitorKeptUpdated.fill(obj.phone = true, index, index++) // use the 'index' to update a value inside the object
            }
            else {
              let option = {
                id: item,
                email: false,
                phone: true
              }
              visitorKeptUpdated.push(option)
            }
          }

          commit('UPDATE_VISITOR_UPDATES', visitorKeptUpdated)
          commit('UPDATE_VISITOR_NEWSLETTERS', response.data.Newsletters)
          commit('UPDATE_VISITOR_SUBSCRIPTIONS', response.data.Subscriptions)
        }
      }
    )
  }
}
