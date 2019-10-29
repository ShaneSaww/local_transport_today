
import axios from 'axios'

export const state = () => ({
  newsletters: []
})

export const mutations = {
  UPDATE_NEWSLETTERS(state, payload) {
    state.newsletters = payload
  }
}

export const actions = {
  async retrieveNewsletters({commit}) {
    await axios.get('https://crm.grouptravelorganiser.com/api/collections/get/MailChimp_Newsletters?token=19bf867a17a69bb1600440a1fbbf4f',
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => {
        if (response.status === 200) {
          let newsletters = []

          for (let newsletter of response.data.entries) {
            let entry = {
              id: newsletter._id,
              name: newsletter.Name,
              mailchimpID: newsletter.Unique_Code,
              groupID: newsletter.Unique_Group_Code,
              description: newsletter.Description
            }

            newsletters.push(entry)
          }

          commit('UPDATE_NEWSLETTERS', newsletters)
        }
      }
    )
  }
}
