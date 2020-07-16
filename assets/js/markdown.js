import marked, { Renderer } from 'marked'

const util = {
  parseMarkdown(content) {
    const renderer = new Renderer() // create your custom renderer

    renderer.smartypants = true // smartypants = typographic punctuation for quotes and dashes

    renderer.blockquote = (quote) => {
      return `<aside role="complementary"><blockquote>${quote}</blockquote></aside>`
    }

    renderer.image = (href, title, text) => {
      if (href) {
        if (title) {
          return `<figure><a href="${href}" target="_blank" rel="noopener noreferrer"><img loading="lazy" src="${href}" alt="${text}" title="${title}" /></a><figcaption>${title}</figcaption></figure>`
        }
        else {
          return `<figure><a href="${href}" target="_blank" rel="noopener noreferrer"><img loading="lazy" src="${href}" alt="${text}" /></a></figure>`
        }
      }
      else {
        return ''
      }
    }

    renderer.listitem = (text, task, checked) => {
      if (!task) {
        return `<li class="font-mono ltt-text-red"><span class="font-serif text-gray-333">${text}</span></li>`
      }
    }

    marked.setOptions({ renderer }) // set the renderer to marked

    return marked(content)
  }
}

export default util
