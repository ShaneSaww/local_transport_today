
const axios = require('axios');
const print = require('graphql').print;
const gql = require('graphql-tag');

exports.handler = async function(event, context) {

  const { FAUNA_READONLY_KEY, FAUNA_GRAPHQL_URL } = process.env

  const body = JSON.parse(event.body)
  const postSlug = body.postSlug

  const ALL_COMMENTS_BY_POST_SLUG = gql`
  query allCommentsByPostSlug($postSlug: String!) {
    allCommentsByPostSlug(postSlug: $postSlug) {
      data {
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
    }
  }`

  let comments = await axios.post(FAUNA_GRAPHQL_URL,
    {
      query: print(ALL_COMMENTS_BY_POST_SLUG),
      variables: {
        postSlug: postSlug
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
      body: JSON.stringify(response.data.data.allCommentsByPostSlug.data),
      statusCode: response.status
    }
  }).catch((error) => {
    console.log('Error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  })

  return comments
}
