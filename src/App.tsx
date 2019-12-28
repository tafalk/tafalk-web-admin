import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { withAuthenticator, SignIn } from 'aws-amplify-react'
import Amplify from 'aws-amplify'
import { GoogleRecaptchaV3Config, AwsConfig } from './config'
import TafalkWebAdminHeader from './components/shared/TheHeader'
import TafalkRoutingMenu from './components/shared/TheRoutingMenu'
import router from './router'

Amplify.configure(AwsConfig)

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <TafalkWebAdminHeader />
        <Container fluid>
          <Row>
            {/* Navigation Bar */}
            <Col xs={2}>
              <TafalkRoutingMenu />
            </Col>
            {/* Navigation Bar */}
            <Col>
              {router.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  )
}

export default withAuthenticator(
  App,
  false, // includeGreetings
  [<SignIn />] // authenticatorComponents
)
