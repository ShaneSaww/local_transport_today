const fs = require('fs')
fs.writeFileSync('./.env', `
URL=${process.env.URL}
`)
