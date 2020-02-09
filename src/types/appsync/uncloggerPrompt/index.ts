import { AppSyncUser } from '../user'

// ListUncloggerPrompts
export type AppSyncListUncloggerPromptsResultData = {
  listUncloggerPrompts: AppSyncUncloggerPrompt[]
}

export type AppSyncCountUncloggerPromptsResultData = {
  countUncloggerPrompts: number
}

export type AppSyncUncloggerPrompt = {
  id: string
  category: string
  body: string
  language: string
  status: string
  creatorUserId: string
  creatorUser: AppSyncUser
  reviewerUserId: string
  reviewerUser: AppSyncUser
  reviewNote: string
  createTime: string
  reviewTime: string
}

// Create
export type AppSyncCreateUncloggerPromptResultData = {
  createUncloggerPrompt: {
    id: string
  }
}

// Update
export type AppSyncUpdateUncloggerPromptContentResultData = {
  updateUncloggerPromptContent: {
    id: string
  }
}

export type AppSyncUpdateUncloggerPromptReviewResultData = {
  updateUncloggerPromptReview: {
    id: string
  }
}
