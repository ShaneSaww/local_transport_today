import marked, { Renderer } from 'marked'

const util = {
  parseMarkdown(content) {
    const renderer = new Renderer() // create your custom renderer

    renderer.smartypants = true // smartypants = typographic punctuation for quotes and dashes

    renderer.blockquote = (quote) => {
      return `<aside role="complementary"><blockquote>${quote}</blockquote></aside>`
    }

    renderer.image = (href, title, text) => {
      return `<figure><img loading="lazy" src="${href}" alt="${text}" title="${title}" /><figcaption>${title}</figcaption></figure>`
    }

    marked.setOptions({ renderer }) // set the renderer to marked

    return marked(content)
  }
}

export default util
