import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import TafalkWebAdminHeader from './components/shared/TheHeader'
import TafalkRoutingMenu from './components/shared/TheRoutingMenu'
import router from './router'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <TafalkWebAdminHeader />
        <Grid padded>
          <Grid.Column width={3}>
            <TafalkRoutingMenu />
          </Grid.Column>
          <Grid.Column stretched width={13}>
            {router.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Grid.Column>
        </Grid>
      </div>
    </Router>
  )
}

export default App
