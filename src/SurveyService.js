import _ from 'lodash'

const SURVEY_MONKEY_TOKEN = '[MOCK_TOKEN]'

const COLLECTORS_ID = {
  CANCEL_WORKSPACE: '161532116',
  DELETE_ACCOUNT: '162490866',
  TEST: '162280734'
}

const CANCEL_WORKSPACE = {
  PAGE_ID: '48414504',
  MULTIPLE_CHOICES_ID: '162037852',
  COMMENTS_ID: '164973120',
  CHOICE_ID: {
    DONT_UNDERSTAND: '1170264109',
    DONT_NEED: '1170264110',
    PREFER_OTHER_APPS: '1170264111',
    LACK_FEATURES: '1170264112',
    BUGS: '1170264113',
    EXPENSIVE: '1170264119',
    SLOW: '1170264120',
    OTHERS: '1170286307'
  }
}

const cancelSubscriptionApiUrl =
  'https://api.surveymonkey.net/v3/collectors/' + COLLECTORS_ID.CANCEL_WORKSPACE + '/responses'
const deleteAccountApiUrl =
  'https://api.surveymonkey.net/v3/collectors/' + COLLECTORS_ID.DELETE_ACCOUNT + '/responses'
const testApiUrl =
  'https://api.surveymonkey.net/v3/collectors/' + COLLECTORS_ID.TEST + '/responses'

const getCustomVariables = (customData) => {
  const customVariables = {
    name: customData.user.name,
    workspace_display_name: customData.workspace.displayName,
  }
  return customVariables
}

const getChoiceID = (key) => {
  switch (key) {
    case 'dont_understand': return CANCEL_WORKSPACE.CHOICE_ID.DONT_UNDERSTAND
    case 'dont_need': return CANCEL_WORKSPACE.CHOICE_ID.DONT_NEED
    case 'prefer_other_apps': return CANCEL_WORKSPACE.CHOICE_ID.PREFER_OTHER_APPS
    case 'lack_features': return CANCEL_WORKSPACE.CHOICE_ID.LACK_FEATURES
    case 'bugs': return CANCEL_WORKSPACE.CHOICE_ID.BUGS
    case 'expensive': return CANCEL_WORKSPACE.CHOICE_ID.EXPENSIVE
    case 'slow': return CANCEL_WORKSPACE.CHOICE_ID.SLOW
    case 'others': return CANCEL_WORKSPACE.CHOICE_ID.OTHERS
    default: return ''
  }
}

const getSurveyPayload = (feedbackRefs, comment, data) => {
  const surveyAnswers = _.map(feedbackRefs, ref => {
    if (getChoiceID(ref.key) === CANCEL_WORKSPACE.CHOICE_ID.OTHERS) {
      return {
        text: ref.value || 'n/a',
        other_id: CANCEL_WORKSPACE.CHOICE_ID.OTHERS
      }
    } else {
      return { choice_id: getChoiceID(ref.key) }
    }
  })
  const surveyPayload = {
    custom_variables: getCustomVariables(data),
    pages: [
      {
        id: CANCEL_WORKSPACE.PAGE_ID,
        questions: [
          {
            id: CANCEL_WORKSPACE.MULTIPLE_CHOICES_ID,
            answers: surveyAnswers
          }
        ]
      }
    ]
  }
  if (comment) {
    const commentAnswers = [{ text: comment }]
    const commentQuestion = {
      id: CANCEL_WORKSPACE.COMMENTS_ID,
      answers: commentAnswers
    }
    surveyPayload.pages[0].questions.push(commentQuestion)
  }
  return surveyPayload
}

const getSubmitToSurveyMonkey = (apiUrl) => {
  return ({ feedbackRefs, comment, data }) => {
    const surveyPayload = getSurveyPayload(feedbackRefs, comment, data)

    // Note that the below comment block resembles the actual implementation
    /*
    window.fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SURVEY_MONKEY_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(surveyPayload),
    })
    */

    // Simulate a success/failure response
    // Note that there is 30% chance of getting error from the server
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.3) {
          reject({ message: 'Error submitting SurveyMonkey', surveyPayload })
        } else {
          resolve()
        }
      }, 1000)
    })
  }
}

export const submitToSurveyMonkeyCancelSubscription = getSubmitToSurveyMonkey(cancelSubscriptionApiUrl)
export const submitToSurveyMonkeyDeleteAccount = getSubmitToSurveyMonkey(deleteAccountApiUrl)
