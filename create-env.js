const fs = require('fs')
fs.writeFileSync('./.env', `
URL=${process.env.URL}\n
FAUNA_READONLY_KEY=${process.env.FAUNA_READONLY_KEY}\n
FAUNA_READWRITE_KEY=${process.env.FAUNA_READWRITE_KEY}\n
FAUNA_GRAPHQL_URL=${process.env.FAUNA_GRAPHQL_URL}\n
MAGIC_PUBLISHABLE_API_KEY=${process.env.MAGIC_PUBLISHABLE_API_KEY}
`)
