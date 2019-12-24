import { AppSyncUser } from '../user'

// ListUncloggerPrompts
export type AppSyncListFlagsResultData = {
  listUncloggerPrompts: {
    items: AppSyncFlag[]
    nextToken: string
  }
}

export type AppSyncFlag = {
  id: string
  contentType: string
  contentId: string
  flaggerUserId: string
  flaggerUser: AppSyncUser
  category: string
  type: string
  detail: string
  reviewerUserId: string
  reviewerUser: AppSyncUser
  reviewStatus: string
  reviewNote: string
  createTime: string
  lastUpdateTime: string
}
