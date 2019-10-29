
import axios from 'axios'
import dayjs from 'dayjs'

export const state = () => ({
  eventDate: '',
  eventTimeStart: '',
  eventTimeEnd: '',
  eventVenue: '',
  venueLat: 0,
  venueLng: 0,
  venueAddress: '',
  venueLocality: '',
  venueRegion: '',
  venuePostcode: '',
  venueDirections: '',
  venueParking: '',
  venueTrainStation: '',
  venueTrainStationLat: '',
  venueTrainStationLng: '',
  structuredData: {}
})

export const mutations = {
  UPDATE_JSONLD(state, payload) {
    state.structuredData = payload
  },

  UPDATE_EVENT(state, payload) {
    state.eventDate = payload.eventDate
    state.eventTimeStart = payload.eventTimeStart
    state.eventTimeEnd = payload.eventTimeEnd
    state.eventVenue = payload.eventVenue
    state.venueLat = payload.venueLat
    state.venueLng = payload.venueLng
    state.venueAddress = payload.venueAddress
    state.venueLocality = payload.venueLocality
    state.venueRegion = payload.venueRegion
    state.venuePostcode = payload.venuePostcode
    state.venueDirections = payload.venueDirections
    state.venueParking = payload.venueParking
    state.venueTrainStation = payload.venueTrainStation
    state.venueTrainStationLat = payload.venueTrainStationLat
    state.venueTrainStationLng = payload.venueTrainStationLng
  }
}

export const actions = {
  async retrieveEvent({commit}) {
    //await app.$axios.get(process.env.EVENT_URL)
    //console.log('url = ' + process.env.VUE_APP_EVENT_URL)
    //console.log(process.env)
    //await axios.get(process.env.VUE_APP_EVENT_URL,
    await axios.get('https://crm.grouptravelorganiser.com/api/singletons/get/Northern_Travel_Show_Website?token=19bf867a17a69bb1600440a1fbbf4f',
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => {
        if (response.status === 200) {
          //console.log('url = ' + process.env.VUE_APP_EVENT_URL)

          var latitude = String(response.data.Venue_Geolocation.lat)
          var longitude = String(response.data.Venue_Geolocation.lng)
          var jsonLD = {
            "@context": "http://schema.org",
            "@type": "Event",
            "name": "Northern Travel & Tourism Show",
            "description": "The north's leading travel show for group travel organisers, travel trade and tour operators.",
            "url": "https://www.northerntravel.show",
            "startDate": response.data.Event_Date+"T"+response.data.Event_Time_Start,
            "doorTime": response.data.Event_Time_Start,
            "endDate": response.data.Event_Date+"T"+response.data.Event_Time_End,
            "eventStatus": "http://schema.org/EventScheduled",
            "image": {
              "@type": "ImageObject",
              "url": "https://www.northerntravel.show/northern_travel_tourism_show_compass_480.png",
              "width": 480,
              "height": 480
            },
            "location": {
              "@type": "Place",
              "name": response.data.Venue_Name,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": response.data.Postal_Address,
                "addressLocality": response.data.Postal_Locality,
                "addressRegion": response.data.Postal_Region,
                "postalCode": response.data.Postal_Postcode,
                "addressCountry": "GB"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": latitude,
                "longitude": longitude
              }
            },
            "performer": {
              "@type": "Person",
              "name": "Anoek Petit"
            },
            "offers": [{
              "@type": "Offer",
              "name": "General Admission",
              "category": "primary",
              "price": "00.00",
              "priceCurrency": "GBP",
              "url": "https://www.northerntravel.show/visitors/registration",
              "availability": "http://schema.org/InStock",
              "validFrom": "2019-09-01T00:00",
              "inventoryLevel": "500"
            }]
          }

          var eventData = {
            eventDate: response.data.Event_Date,
            eventTimeStart: response.data.Event_Time_Start,
            eventTimeEnd: response.data.Event_Time_End,
            eventVenue: response.data.Venue_Name,
            venueLat: response.data.Venue_Geolocation.lat,
            venueLng: response.data.Venue_Geolocation.lng,
            venueAddress: response.data.Postal_Address,
            venueLocality: response.data.Postal_Locality,
            venueRegion: response.data.Postal_Region,
            venuePostcode: response.data.Postal_Postcode,
            venueDirections: response.data.Directions,
            venueParking: response.data.Parking,
            venueTrainStation: response.data.Train_Station,
            venueTrainStationLat: response.data.Train_Station_Location.lat,
            venueTrainStationLng: response.data.Train_Station_Location.lng
          }

          commit('UPDATE_JSONLD', jsonLD)
          commit('UPDATE_EVENT', eventData)
        }
      }
    )
  }
}
