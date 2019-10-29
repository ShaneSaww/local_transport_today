const fs = require('fs')
fs.writeFileSync('./.env', `
URL=${process.env.URL}\n
CRM_URL=${process.env.CRM_URL}\n
SUBMIT_FORMS_TOKEN=${process.env.SUBMIT_FORMS_TOKEN}
`)
