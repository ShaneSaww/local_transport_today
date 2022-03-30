
const axios = require('axios')
const print = require('graphql').print
const gql = require('graphql-tag')

exports.handler = async function(event, context) {

  let test = 'Please ignore. This is being added to force AWS to recompile the lambda function.'

  const { FAUNA_READONLY_KEY, FAUNA_GRAPHQL_URL } = process.env

  const body = JSON.parse(event.body)
  const magicId = body.magicId

  const FIND_USER_BY_MAGIC_ID = gql`
  query findUserByMagicID($magicId: ID!) {
    findUserByMagicID(magicId: $magicId) {
      data {
        _id
        magicId
        role
        email
        forename
        surname
        occupation
        organisation
      }
    }
  }`

  let user = await axios.post(FAUNA_GRAPHQL_URL,
    {
      query: print(FIND_USER_BY_MAGIC_ID),
      variables: {
        magicId: magicId
      }
    },
    {
      headers: {
        Authorization: 'Bearer ' + FAUNA_READONLY_KEY,
        'Content-Type': 'application/json'
      }
    }
  ).then((response) => {
    return {
      body: JSON.stringify(response.data.data.findUserByMagicID.data[0]),
      statusCode: response.status
    }
  }).catch((error) => {
    console.log('Error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  })

  return user
}
