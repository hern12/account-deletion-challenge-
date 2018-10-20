const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const _ = require('lodash')

module.exports = functions.https.onRequest((request, response) =>
  cors(request, response, async () => {
    if (request.method !== 'POST') {
      return response.sendStatus(405)
    }

    if (
      !_.isArray(request.body.transferTargets) ||
      _.some(
        request.body.transferTargets,
        assign => !assign.userId || !assign.spaceId
      )
    ) {
      return response.sendStatus(400)
    }

    // Simulate an internal server error
    if (Math.random() <= 0.1) {
      return response.sendStatus(500)
    }

    // Simulate a slowness
    if (Math.random() <= 0.5) {
      await sleep(3000)
    }

    response.sendStatus(200)
  })
)
