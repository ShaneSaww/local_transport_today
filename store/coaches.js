
import axios from 'axios'

export const state = () => ({
  coaches: [],
  pickupPoints: [],
  mapCenter: {}
})

export const getters = {
  retrieveNearestCoaches: (state) => (geolocation) => (limit) => {

    var allCoaches = []

    for (var coach of state.pickupPoints) {

      let distance = (((Math.acos(Math.sin((geolocation.lat * Math.PI / 180)) * Math.sin((coach.geolocation.lat * Math.PI / 180)) + Math.cos((geolocation.lat * Math.PI / 180)) * Math.cos((coach.geolocation.lat * Math.PI / 180)) * Math.cos(((geolocation.lng - coach.geolocation.lng) * Math.PI / 180)))) * 180 / Math.PI) * 60 * 1.1515)

      let location = {
        distance: distance,
        coachNum: coach.coachNum,
        locationNum: coach.locationNum,
        city: coach.city,
        location: coach.location,
        timePickup: coach.timePickup,
        timeReturn: coach.timeReturn,
        geolocation: coach.geolocation
      }

      allCoaches.push(location)
    }

    allCoaches.sort(function(a,b) { return parseFloat(a.distance) - parseFloat(b.distance) } ) // order coaches by distance to user's postcode

    let nearestCoaches = allCoaches.slice(0, limit); // only reveal the nearest number of coaches (dictated by the 'limit' variable)

    return nearestCoaches
  },

  retrieveMapCenter: (state) => {
    return state.mapCenter
  }
}

export const mutations = {
  UPDATE_COACHES(state, payload) {
    state.coaches = payload
  },

  UPDATE_PICKUP_POINTS(state, payload) {
    state.pickupPoints = payload
  },

  UPDATE_MAP_CENTER(state, payload) {
    state.mapCenter = payload
  },

  UPDATE_MAP_CENTER_STATE(state, payload) {
    state.mapCenter[payload.coachNum].lat = payload.lat
    state.mapCenter[payload.coachNum].lng = payload.lng
    state.mapCenter[payload.coachNum].zoom = payload.zoom
  }
}

export const actions = {
  async retrieveCoachesAndLocations({commit}) {
    await axios.get('https://crm.grouptravelorganiser.com/api/collections/get/Northern_Travel_Show_Coach_Routes?token=19bf867a17a69bb1600440a1fbbf4f',
      JSON.stringify({
        sort: {Coach_Route_Number:1},
        populate: 1
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => {
        if (response.status === 200) {
          var coaches = [] // this will contain pick-up locations that's stacked for coach journeys
          var pickupPoints = [] // this will contain pick-up locations (as a look-up table) to find nearest available stops
          var pickupLoop = 0
          var mapCenter = {}

          //console.log(response.data.entries[0])

          for (var coach of response.data.entries) {
            /*let arrayCoach = {}
            let arrayCoach['routeNum'] = coach.Coach_Route_Number
            let arrayCoach['company'] = coach.Coach_Company
            let arrayCoach['arrive'] = coach.Arrive
            let arrayCoach['depart'] = coach.Depart
            let arrayCoach['stops'] = {}*/

            //console.log(coach)

            //console.log(coach['Coach_Route_Number'])

            var stops = []

            for (var stop of coach.Coach_Pickup_Points) {
              /*let arrayStop = {}
              let arrayStop['city'] = stop.value.city
              let arrayStop['location'] = stop.value.stop
              let arrayStop['timePickup'] = stop.value.Pick_up
              let arrayStop['timeReturn'] = stop.value.Return
              let arrayStop['geolocation'] = stop.value.Map_Geolocation
              arrayCoach['stops'][] = arrayStop // push locations to coach journeys
              pickupPoints[] = arrayStop // push locations into pickup locations look-up table*/

              pickupLoop = pickupLoop + 1

              let location = {
                coachNum: coach.Coach_Route_Number,
                locationNum: pickupLoop,
                city: stop.value.city,
                location: stop.value.stop,
                timePickup: stop.value.Pick_up,
                timeReturn: stop.value.Return,
                geolocation: stop.value.Map_Geolocation
              }

              stops.push(location)
              pickupPoints.push(location) // push locations into pickup locations look-up table
            }

            // Find the average geolocation because OpenStreetMap (Leaflet) doesn't do it by default for multiple markers (unlike Google Maps)

            function averageGeolocation(coords) {
              let num_coords = coords.length

              if (num_coords === 1) {
                return {
                  lat: coords[0].geolocation.lat,
                  lng: coords[0].geolocation.lng
                }
              }

              let x = 0.0
              let y = 0.0
              let z = 0.0

              for (let coord of coords) {
                let latitude = coord.geolocation.lat * Math.PI / 180
                let longitude = coord.geolocation.lng * Math.PI / 180

                x += Math.cos(latitude) * Math.cos(longitude)
                y += Math.cos(latitude) * Math.sin(longitude)
                z += Math.sin(latitude)
              }

              x = x / num_coords
              y = y / num_coords
              z = z / num_coords

              let centralLongitude = Math.atan2(y, x)
              let centralSquareRoot = Math.sqrt(x * x + y * y)
              let centralLatitude = Math.atan2(z, centralSquareRoot)

              return {
                lat: centralLatitude * 180 / Math.PI,
                lng: centralLongitude * 180 / Math.PI
              }
            }

            function medianGeolocation(coords) {
              let num_coords = coords.length

              if (num_coords === 1) {
                return {
                  lat: coords[0].geolocation.lat,
                  lng: coords[0].geolocation.lng
                }
              }

              let lat = []
              let lng = []

              for (let coord of coords) {
                lat.push(coord.geolocation.lat)
                lng.push(coord.geolocation.lng)
              }

              lat.sort(function(a, b){return a - b})
              lng.sort(function(a, b){return a - b})

              let lat_center = (lat[0] + lat[num_coords - 1]) / 2
              let lng_center = (lng[0] + lng[num_coords - 1]) / 2

              return {
                lat: lat_center,
                lng: lng_center
              }
            }

            //let center = averageGeolocation(pickupPoints)
            let center = medianGeolocation(stops)

            //console.log(center.lat)

            //mapCenter[coach.Coach_Route_Number].lat = center.lat
            //mapCenter[coach.Coach_Route_Number].lng = center.lng
            //mapCenter[2].zoom = 8

            let mapCenterDetails = {
              lat: center.lat,
              lng: center.lng,
              zoom: 8
            }

            mapCenter[coach.Coach_Route_Number] = mapCenterDetails



            //mapCenter.push(mapCenterDetails)

            let coachDetails = {
              routeNum: coach.Coach_Route_Number,
              company: coach.Coach_Company,
              arrive: coach.Arrive,
              depart: coach.Depart,
              center: center,
              stops: stops
            }

            //coaches[] = objectCoach
            coaches.push(coachDetails)
            //pickupPoints[] = objectStop // push locations into pickup locations look-up table
            //pickupPoints.push(stops) // push locations into pickup locations look-up table
          }

          //console.log(mapCenter)



          /*var eventData = {
            eventDate: response.data.Event_Date,
            eventTimeStart: response.data.Event_Time_Start,
            eventTimeEnd: response.data.Event_Time_End,
            eventVenue: response.data.Venue_Name,
            venueLat: response.data.Venue_Geolocation.lat,
            venueLng: response.data.Venue_Geolocation.lng,
            venueAddress: response.data.Postal_Address,
            venueLocality: response.data.Postal_Locality,
            venueRegion: response.data.Postal_Region,
            venuePostcode: response.data.Postal_Postcode
          }*/

          //console.log(coaches)

          commit('UPDATE_COACHES', coaches)
          commit('UPDATE_PICKUP_POINTS', pickupPoints)
          commit('UPDATE_MAP_CENTER', mapCenter)
        }
      }
    )
  },

  updateMapCenter: ({commit, state}, payload) => {
    commit('UPDATE_MAP_CENTER_STATE', payload)
  }
}
