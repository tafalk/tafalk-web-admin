import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Header, Button, Menu } from 'semantic-ui-react'

const TheHeader: React.FC = () => {
  // username hook
  const [username, setUsername] = useState(null)
  useEffect(() => {
    const currUserName = async () => {
      const currUser = await Auth.currentAuthenticatedUser()
      setUsername(currUser.username)
    }
    currUserName()
  }, [])

  const signOut = async () => {
    await Auth.signOut()
  }

  return (
    <Menu borderless pointing>
      <Menu.Item color="red" name="Tafalk! Admin">
        <Header as="h2" color="red">
          Tafalk! Admin
        </Header>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>Hello, {username}</Menu.Item>
        <Menu.Item>
          <Button negative onClick={signOut}>
            LOGOUT
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default TheHeader
