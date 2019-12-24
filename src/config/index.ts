// Google
export const GoogleRecaptchaV3Config = {
  siteKey: process.env.REACT_APP_GOOGLE_RECAPTCHA_V3_SITE_KEY
}

// AWS
export const AwsConfig = {
  // Cognito
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID
  },
  // AppSync
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.REACT_APP_AWS_REGION,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS'
}
