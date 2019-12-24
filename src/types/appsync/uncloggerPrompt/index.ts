import { AppSyncUser } from '../user'

// ListUncloggerPrompts
export type AppSyncListUncloggerPromptsResultData = {
  listUncloggerPrompts: {
    items: AppSyncUncloggerPrompt[]
    nextToken: string
  }
}

export type AppSyncUncloggerPrompt = {
  id: string
  category: string
  body: string
  language: string
  state: string
  creatorUserId: string
  creatorUser: AppSyncUser
  approverUserId: string
  approverUser: AppSyncUser
  createTime: string
  approveTime: string
}
