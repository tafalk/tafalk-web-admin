import { Auth, API, graphqlOperation } from 'aws-amplify'
import { GetUserIdByUserName } from '../graphql/User'
import { AppSyncGetUserByUsernameResultData } from '../types/appsync/user'

export const GetCurrAuthUserId = async (): Promise<string> => {
  const currAuthUser = await Auth.currentAuthenticatedUser()
  const currAuthUserName = currAuthUser.username
  const getUserIdByUserNameGraphqlReq = (await API.graphql(
    graphqlOperation(GetUserIdByUserName, { username: currAuthUserName })
  )) as {
    data: AppSyncGetUserByUsernameResultData
  }
  const getUserIdByUserNameGraphqlResult =
    getUserIdByUserNameGraphqlReq.data.getUserByUsername
  return getUserIdByUserNameGraphqlResult.id
}
