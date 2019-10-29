
import axios from 'axios'

export const state = () => ({
  exhibitionSpace: [],
  addOns: [],
  sponsorshipOpportunities: {},
  standSharerPrice: 0,
  exhibitorNewsletters: [],
  exhibitorSubscriptions: []
})

export const mutations = {
  UPDATE_EXHIBITION_SPACE(state, payload) {
    state.exhibitionSpace = payload
  },

  UPDATE_ADDONS(state, payload) {
    state.addOns = payload
  },

  UPDATE_SPONSORSHIP_OPPORTUNITIES(state, payload) {
    state.sponsorshipOpportunities = payload
  },

  UPDATE_STAND_SHARER_PRICE(state, payload) {
    state.standSharerPrice = payload
  },

  UPDATE_EXHIBITOR_NEWSLETTERS(state, payload) {
    state.exhibitorNewsletters = payload
  },

  UPDATE_EXHIBITOR_SUBSCRIPTIONS(state, payload) {
    state.exhibitorSubscriptions = payload
  }
}

export const actions = {
  async retrieveExhibitorRegistrationOptions({commit}) {
    await axios.get('https://crm.grouptravelorganiser.com/api/singletons/get/Northern_Exhibitor_Registration_Form_Fields?token=19bf867a17a69bb1600440a1fbbf4f',
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => {
        if (response.status === 200) {
          let exhibitionSpace = [] // this will contain each exhibition space option
          let addOns = []
          let sponsorshipOpportunities = []
          let key = 0
          let previousPrice = 0
          let previousArea = 0
          let cost_saving = 0

          let firstPrice = 0
          let firstSpace = 0

          for (let space of response.data.Exhibition_Space) {
            let currentArea = parseInt(space.value.length) * parseInt(space.value.width)
            if (key === 0) {
              firstPrice = parseInt(space.value.price)
              firstSpace = currentArea
            }
            else if (key > 0) {
              //let spaceIncrease = currentArea / previousArea
              let spaceIncrease = currentArea / firstSpace
              //let priceIncrease = previousPrice * spaceIncrease
              let priceIncrease = firstPrice * spaceIncrease
              let difference = (parseInt(space.value.price) / priceIncrease) * 100
              cost_saving = Math.round(100 - difference)
            }

            let option = {
              length: space.value.length,
              width: space.value.width,
              standSharer: space.value.stand_sharers,
              price: space.value.price,
              status: space.value.status,
              costSaving: cost_saving
            }

            exhibitionSpace.push(option)

            key = key + 1
            previousPrice = space.value.price
            previousArea = currentArea
          }

          for (let addon of response.data.Add_ons) {
            let option = {
              item: addon.value.item,
              price: addon.value.price,
              status: addon.value.status,
              included: addon.value.included
            }

            addOns.push(option)
          }

          for (let sponsorship of response.data.Sponsorship_Opportunities) {
            let option = {
              item: sponsorship.value.item,
              price: sponsorship.value.price,
              status: sponsorship.value.status,
              sponsorSupply: sponsorship.value.sponsor_supply
            }

            sponsorshipOpportunities.push(option)
          }

          commit('UPDATE_EXHIBITION_SPACE', exhibitionSpace)
          commit('UPDATE_ADDONS', addOns)
          commit('UPDATE_SPONSORSHIP_OPPORTUNITIES', sponsorshipOpportunities)
          commit('UPDATE_STAND_SHARER_PRICE', response.data.Stand_Sharer_Price)
          commit('UPDATE_EXHIBITOR_NEWSLETTERS', response.data.Newsletters)
          commit('UPDATE_EXHIBITOR_SUBSCRIPTIONS', response.data.Subscriptions)
        }
      }
    )
  }
}
