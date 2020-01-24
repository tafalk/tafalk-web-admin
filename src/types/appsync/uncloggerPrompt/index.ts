import { AppSyncUser } from '../user'

// ListUncloggerPrompts
export type AppSyncListUncloggerPromptsResultData = {
  listUncloggerPrompts: AppSyncUncloggerPrompt[]
}

// Create
export type AppSyncCreateUncloggerPromptResultData = {
  createUncloggerPrompt: {
    id: string
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
  reviewerUserId: string
  reviewerUser: AppSyncUser
  reviewNote: string
  createTime: string
  reviewTime: string
}
