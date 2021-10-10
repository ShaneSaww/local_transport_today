
import helperMd5 from '../assets/js/md5.js'
import helperEstimateReadingTime from '../assets/js/reading-time.js'

function md5 (string) {
  return helperMd5.md5(string)
}

function estimateReadingTime (articleBody) {
  return helperEstimateReadingTime.estimateReadingTime(articleBody)
}

function convertNameToAlphabetical (name) {
  let nameArray = name.split(' ')
  let firstname = nameArray.shift() // also removes first item from the array
  nameArray.push(firstname)
  return nameArray.join(' ')
}

export default async () => {

  const fs = require('fs')
  const path = require('path')

  let allCategories = await fs.readdirSync('./assets/content/categories').map(file => {
    let category = require(`../assets/content/categories/${file}`)

    return category
  })

  let allAuthors = await fs.readdirSync('./assets/content/authors').map(file => {
    let author = require(`../assets/content/authors/${file}`)

    return author
  })

  let allEditorials = await fs.readdirSync('./assets/content/editorials').map(file => {
    let editorial = require(`../assets/content/editorials/${file}`)

    return {
      ...editorial,
      slug: `${file.replace('.json', '').replace('./', '')}`,
      md5: md5(`${file.replace('.json', '').replace('./', '')}`),
      estimatedReadingTimeMinutes: estimateReadingTime(editorial.body)
    }
  })

  allEditorials.sort(function (a, b) {
    if (a.datePublished < b.datePublished) {
      return 1
    }
    if (a.datePublished > b.datePublished) {
      return -1
    }

    return 0 // names must be equal
  })

  let editorials = await fs.readdirSync('./assets/content/editorials').map(file => {
    let slug = file.replace('.json', '').replace('./', '')
    let editorial = require(`../assets/content/editorials/${file}`)

    let authorEditorials = allEditorials.filter(x => x.published === true && x.author === editorial.author && x.slug != slug)
    let author = allAuthors.filter(x => x.name === editorial.author)

    return {
      route: '/' + slug + '/',
      payload: {
        editorial,
        authorEditorials,
        author: author[0]
      }
    }
  })

  let categories = await fs.readdirSync('./assets/content/categories').map(file => {
    let slug = file.replace('.json', '').replace('./', '')
    let category = require(`../assets/content/categories/${file}`)

    let categoryEditorials = allEditorials.filter(x => x.published === true && x.categories.includes(category.name))

    return {
      route: '/category/' + slug + '/',
      payload: {
        category,
        categoryEditorials
      }
    }
  })

  let authors = await fs.readdirSync('./assets/content/authors').map(file => {
    let slug = file.replace('.json', '').replace('./', '')
    let author = require(`../assets/content/authors/${file}`)

    let authorEditorials = allEditorials.filter(x => x.published === true && x.author === author.name)

    return {
      route: '/author/' + slug + '/',
      payload: {
        author,
        authorEditorials
      }
    }
  })

  let editorialsIndex = allEditorials.filter(x => x.published === true)

  let categoryIndex = await fs.readdirSync('./assets/content/categories').map(file => {
    let slug = file.replace('.json', '').replace('./', '')
    let category = require(`../assets/content/categories/${file}`)

    let categoryEditorials = allEditorials.filter(x => x.published === true && x.categories.includes(category.name))

    return {
      slug: slug,
      name: category.name,
      editorials: categoryEditorials
    }
  })

  let authorIndex = await fs.readdirSync('./assets/content/authors').map(file => {
    let slug = file.replace('.json', '').replace('./', '')
    let author = require(`../assets/content/authors/${file}`)

    let authorEditorials = allEditorials.filter(x => x.published === true && x.author === author.name)

    return {
      slug: slug,
      a2z: convertNameToAlphabetical(author.name),
      author: author,
      editorials: authorEditorials
    }
  })

  let settingsHome = await require(`../assets/content/settings/home.json`)

  let pagesAbout = await require(`../assets/content/pages/about.json`)

  return Promise.all([categories, authors, editorials, categoryIndex, authorIndex, settingsHome, pagesAbout]).then(values => {

    authorIndex.sort((a, b) => a.a2z.localeCompare(b.a2z))

    let pages = [
      {
        route: '/about/',
        payload: {
          content: pagesAbout
        }
      },
      {
        route: '/',
        payload: {
          authors: authorIndex,
          categories: categoryIndex,
          editorials: editorialsIndex,
          settings: settingsHome
        }
      },
      {
        route: '/author/',
        payload: {
          authors: authorIndex
        }
      },
      {
        route: '/category/',
        payload: {
          categories: categoryIndex
        }
      }
    ]

    return pages.concat(categories, authors, editorials)
  })

}
