import React from 'react'
import { Header, Button, Menu } from 'semantic-ui-react'

const TheHeader: React.FC = () => {
  return (
    <Menu borderless pointing>
      <Menu.Item color='red' name='Tafalk! Admin'>
        <Header as='h2' color='red'>
          Tafalk! Admin
        </Header>
      </Menu.Item>

      <Menu.Item position='right'>
        <Button primary>LOGIN</Button>
      </Menu.Item>
    </Menu>
  )
}

export default TheHeader