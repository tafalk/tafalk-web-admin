import {
  SHOW_UNCLOGGER_PROMPT_DIALOG,
  HIDE_UNCLOGGER_PROMPT_DIALOG,
  SHOW_FLAG_DIALOG,
  HIDE_FLAG_DIALOG
} from './actionTypes'

export const showUncloggerPromptDialog = () => ({
  type: SHOW_UNCLOGGER_PROMPT_DIALOG,
  payload: undefined
})

export const hideUncloggerPromptDialog = () => ({
  type: HIDE_UNCLOGGER_PROMPT_DIALOG,
  payload: undefined
})

export const showFlagDialog = () => ({
  type: SHOW_FLAG_DIALOG,
  payload: undefined
})

export const hideFlagDialog = () => ({
  type: HIDE_FLAG_DIALOG,
  payload: undefined
})
