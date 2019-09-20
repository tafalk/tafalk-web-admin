import TafalkAdminHomeView from './views/Home'
import TafalkAdminFlagsView from './views/Flags'
import TafalkAdminUncloggerHintsView from './views/UncloggerHints'

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
    path: '/uncloggerHints',
    component: TafalkAdminUncloggerHintsView
  }
]

export default router
