import 'dotenv/config';

const {
  EXPO_AWS_PROJECT_REGION,
  EXPO_AWS_COGNITO_REGION,
  EXPO_AWS_APPSYNC_REGION,
  EXPO_AWS_USER_POOLS_ID,
  EXPO_AWS_USER_POOLS_WEB_CLIENT_ID,
  EXPO_AWS_APPSYNC_GRAPHQL_ENDPOINT,
  EXPO_AWS_APPSYNC_AUTHENTICATION_TYPE,
  EXPO_AWS_APPSYNC_API_KEY,
} = process.env;

module.exports = ({ config }) => ({
  ...config,
  extra: {
    aws_project_region: EXPO_AWS_PROJECT_REGION,
    aws_cognito_region: EXPO_AWS_COGNITO_REGION,
    aws_appsync_region: EXPO_AWS_APPSYNC_REGION,
    aws_user_pools_id: EXPO_AWS_USER_POOLS_ID,
    aws_user_pools_web_client_id: EXPO_AWS_USER_POOLS_WEB_CLIENT_ID,
    aws_appsync_graphqlEndpoint: EXPO_AWS_APPSYNC_GRAPHQL_ENDPOINT,
    aws_appsync_authenticationType: EXPO_AWS_APPSYNC_AUTHENTICATION_TYPE,
    aws_appsync_apiKey: EXPO_AWS_APPSYNC_API_KEY,
  },
});
