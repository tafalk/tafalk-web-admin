import TafalkAdminHomeView from './views/Home'
import TafalkAdminFlagsView from './views/Flags'
import TafalkAdminUncloggerPromptsView from './views/UncloggerPrompts'

const router = [
  {
    path: '/',
    exact: true,
    component: TafalkAdminHomeView
  },
  {
    path: '/flags',
    component: TafalkAdminFlagsView
  },
  {
    path: '/uncloggerPrompts',
    component: TafalkAdminUncloggerPromptsView
  }
]

export default router
