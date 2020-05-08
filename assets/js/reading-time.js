const util = {
  estimateReadingTime(articleBody) {
    let wordCount = articleBody.split(' ').length
    let minutes = wordCount / 120 // typical reading speed of 120 words a minute
    if (minutes < 1) {
      minutes = 1
    }
    return Math.floor(minutes)
  }
}

export default util
