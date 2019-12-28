export type AppSyncUser = {
  email: string
  id: string
  location: string
  preferredName: string
  username: string
}

export type AppSyncGetUserByUsernameResultData = {
  getUserByUsername: {
    id: string
  }
}
