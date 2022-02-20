
const axios = require('axios');
const print = require('graphql').print;
const gql = require('graphql-tag');

exports.handler = async function(event, context) {

  const { FAUNA_READWRITE_KEY, FAUNA_GRAPHQL_URL } = process.env

  const body = JSON.parse(event.body)
  const { user, forename, surname, occupation, organisation } = body

  const CREATE_USER = gql`
  mutation createUser($magicId: ID!, $role: RoleEnum!, $email: String!, $forename: String!, $surname: String!, $occupation: String!, $organisation: String!) {
    createUser(data: {magicId: $magicId, role: $role, email: $email, forename: $forename, surname: $surname, occupation: $occupation, organisation: $organisation}) {
      _id
      magicId
      role
      email
      forename
      surname
      occupation
      organisation
    }
  }`

  let newUser = await axios.post(FAUNA_GRAPHQL_URL,
    {
      query: print(CREATE_USER),
      variables: {
        magicId: user.magicId,
        role: 'Contributor',
        email: user.email,
        forename: forename,
        surname: surname,
        occupation: occupation,
        organisation: organisation
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
      body: JSON.stringify(response.data.data.createUser),
      statusCode: response.status
    }
  }).catch((error) => {
    console.log('Error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  })

  return newUser
}
