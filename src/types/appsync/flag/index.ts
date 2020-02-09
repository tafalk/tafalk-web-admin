import { AppSyncUser } from '../user'

// ListFlags
export type AppSyncListFlagsResultData = {
  listFlags: AppSyncFlag[]
}

export type AppSyncCountFlagsResultData = {
  countFlags: number
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
  status: string
  reviewNote: string
  createTime: string
  lastUpdateTime: string
}
