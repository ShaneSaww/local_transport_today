
const axios = require('axios')
const print = require('graphql').print
const gql = require('graphql-tag')

exports.handler = async function(event, context) {

  const { FAUNA_READWRITE_KEY, FAUNA_GRAPHQL_URL } = process.env

  const body = JSON.parse(event.body)
  const { userId, postSlug, message, timestamp } = body

  const CREATE_COMMENT = gql`
  mutation createComment($userId: ID!, $postSlug: String!, $message: String!, $timestamp: Time!) {
    createComment(data: {user: { connect: $userId }, postSlug: $postSlug, message: $message, timestamp: $timestamp}) {
      _id
      user {
        role
        email
        forename
        surname
        occupation
        organisation
      }
      message
      timestamp
    }
  }`

  let newComment = await axios.post(FAUNA_GRAPHQL_URL,
    {
      query: print(CREATE_COMMENT),
      variables: {
        userId,
        postSlug,
        message,
        timestamp
      }
    },
    {
      headers: {
        Authorization: 'Bearer ' + FAUNA_READWRITE_KEY,
        'Content-Type': 'application/json'
      }
    }
  ).then((response) => {
    return {
      body: JSON.stringify(response.data.data.createComment),
      statusCode: response.status
    }
  }).catch((error) => {
    console.log('Error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  })

  return newComment
}
