import {
  SHOW_UNCLOGGER_PROMPT_DIALOG,
  HIDE_UNCLOGGER_PROMPT_DIALOG
} from '../actionTypes'

const initialState = {
  isVisible: false
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_UNCLOGGER_PROMPT_DIALOG: {
      return {
        isVisible: true
      }
    }
    case HIDE_UNCLOGGER_PROMPT_DIALOG: {
      return {
        isVisible: false
      }
    }
    default:
      return state
  }
}
