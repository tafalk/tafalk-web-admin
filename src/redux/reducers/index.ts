import { combineReducers } from 'redux'
import uncloggerPromptDialog from './dialog/uncloggerPrompt'
import flagDialog from './dialog/flag'

export default combineReducers({ uncloggerPromptDialog, flagDialog })
