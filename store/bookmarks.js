
/*import axios from 'axios'
import pkg from '~/package'

export const state = () => ({
  bookmarks: []
})

export const getters = {
  retrieveBookmarks: (state) => {
    return state.bookmarks
  },

  checkBookmark: (state) => (bookmark) => {
    if (state.bookmarks.includes(bookmark)) {
      return true
    }

    return false
  }
}

export const mutations = {
  TOGGLE_BOOKMARK(state, bookmark) {

    let cookieBookmarksArray = []
    let cookieBookmarksString

    if (window.localStorage) {
      cookieBookmarksString = localStorage.getItem('bookmarks')
    }
    else {
      cookieBookmarksString = this.$cookies.get('bookmarks', { parseJSON: false })
    }

    if (cookieBookmarksString) {
      cookieBookmarksArray = cookieBookmarksString.split('-')
    }

    if (cookieBookmarksArray.includes(bookmark)) {
      let truncatedArray = cookieBookmarksArray.filter(item => item !== bookmark)
      cookieBookmarksString = truncatedArray.join('-')
      state.bookmarks = truncatedArray
    }
    else {
      cookieBookmarksArray.push(bookmark)
      cookieBookmarksString = cookieBookmarksArray.join('-')
      state.bookmarks = cookieBookmarksArray
    }

    if (window.localStorage) {
      localStorage.setItem('bookmarks', cookieBookmarksString)
    }
    else {
      if (process.env.NODE_ENV !== 'production') {
        this.$cookies.set('bookmarks', cookieBookmarksString, {
          path: '/',
          //maxAge: 60 * 60 * 24 * 365 * 2, // two years
          expires: new Date(new Date().setFullYear(new Date().getFullYear() + 2)), // two years
          sameSite: 'Lax',
          httpOnly: false // Cookies created via JavaScript cannot include the 'HttpOnly' flag (only server-side languages)
        })
      }
      else {
        this.$cookies.set('bookmarks', cookieBookmarksString, {
          path: '/',
          domain: `${pkg.homepageURL.replace('https://', '').replace('www.', '')}`,
          //maxAge: 60 * 60 * 24 * 365 * 2, // two years
          expires: new Date(new Date().setFullYear(new Date().getFullYear() + 2)), // two years
          sameSite: 'Lax',
          httpOnly: false, // Cookies created via JavaScript cannot include the 'HttpOnly' flag (only server-side languages)
          secure: true
        })
      }
    }
  },

  UPDATE_BOOKMARKS(state) {
    let cookieBookmarksString

    if (window.localStorage) {
      cookieBookmarksString = localStorage.getItem('bookmarks')
    }
    else {
      cookieBookmarksString = this.$cookies.get('bookmarks', { parseJSON: false })
    }

    if (cookieBookmarksString) {
      state.bookmarks = cookieBookmarksString.split('-')
    }
  }
}

export const actions = {

}*/
