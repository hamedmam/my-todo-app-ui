import Constants from 'expo-constants';

const {
  aws_project_region,
  aws_cognito_region,
  aws_appsync_region,
  aws_user_pools_id,
  aws_user_pools_web_client_id,
  aws_appsync_graphqlEndpoint,
  aws_appsync_authenticationType,
  aws_appsync_apiKey,
} = Constants.manifest.extra;

const awsmobile = {
  aws_project_region,
  aws_cognito_region,
  aws_appsync_region,
  aws_user_pools_id,
  aws_user_pools_web_client_id,
  oauth: {},
  aws_appsync_graphqlEndpoint,
  aws_appsync_authenticationType,
  aws_appsync_apiKey,
};

export default awsmobile;
