const qs = require('qs')
const axios = require('axios')

// const agent = new https.Agent({
//   rejectUnauthorized: false
// });

const API_URL = 'https://stampd.io/api/v2';
// const API_URL = 'http://localhost/stampd-v3/api/v2'

// config
const client_id = '' // get your API credentials at https://stampd.io
const secret_key = ''
const blockchain = ''
const hash = ''

// Auth call
axios.get(API_URL + '/init', {
  params: {
    client_id: client_id,
    secret_key: secret_key,
  }
})
  .then((response) => {

    if (response.data && response.data.code === 300) {
      console.log('login success')
      console.log(response.data)

      // Post call
      axios.post(API_URL + '/hash', qs.stringify({
        sess_id: response.data.session_id,
        hash: hash,
        blockchain: blockchain,
        // meta_emails: emails, // share the certificate of this stamping with a comma-separated list of emails
        // meta_notes: notes, // metadata notes
        // meta_filename: filename, // the name of the file
        // meta_category: category, // any category name
      }))
        .then((response) => {

          if (response.data && response.data.code === 301) {
            console.log('post hash success')
            console.log(response.data)
          } else {
            console.error('error in API call')
            console.error(response.data)
          }

        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      console.error('error in API call')
      console.error(response.data)
    }

  })
  .catch((error) => {
    console.error(error)
  })