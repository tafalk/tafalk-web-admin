# tafalk-web-admin

Admin Panel

## Prerequisities

### Local Development

Create an `.env.development.local` file with some content like:

```
REACT_APP_APPSYNC_GRAPHQL_ENDPOINT=https://{api_id}.appsync-api.{region}.amazonaws.com/graphql
REACT_APP_COGNITO_IDENTITY_POOL_ID={region}:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REACT_APP_COGNITO_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_COGNITO_USER_POOL_ID={region}_xxxxxxxxx
REACT_APP_GOOGLE_RECAPTCHA_V3_SITE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Running the project

```
npm start
```
