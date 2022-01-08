import pkg from '../package'

export default async (feed) => {

  feed.options = {
    title: pkg.description,
    link: pkg.homepageURL,
    id: pkg.homepageURL,
    description: pkg.siteDescription
  }

  let fs = require('fs')
  let path = require('path')

  let months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

  let allEditorials = await fs.readdirSync('./assets/content/editorials').map(file => {
    let editorial = require(`../assets/content/editorials/${file}`)
    let date = editorial.datePublished.split('-')
    let month = parseInt(date[1])

    return {
      ...editorial,
      slug: `${file.replace('.json', '').replace('./', '')}`,
      date: new Date(date[2] + ' ' + months[month - 1] + ' ' + date[0] + ' 00:00:00 GMT')
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

  let publishedEditorials = allEditorials.filter(x => x.published === true)

  publishedEditorials.forEach(post => {
    feed.addItem({
      title: post.headline,
      id: pkg.homepageURL + '/' + post.slug,
      link: pkg.homepageURL + '/' + post.slug + '/',
      description: post.subHeadline,
      author: [
        {
          name: post.author
        }
      ],
      date: post.date
    })
  })
}
