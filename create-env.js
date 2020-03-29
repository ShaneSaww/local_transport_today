const fs = require('fs')
fs.writeFileSync('./.env', `
URL=${process.env.URL}\n
CMS_URL=${process.env.CMS_URL}\n
READ_EDITORIALS_PATH=${process.env.READ_EDITORIALS_PATH}\n
READ_EDITORIALS_TOKEN=${process.env.READ_EDITORIALS_TOKEN}
`)
