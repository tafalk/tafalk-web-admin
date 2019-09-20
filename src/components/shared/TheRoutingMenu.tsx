import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const TheRoutingMenu: React.FC = () => {
  return (
    <Menu fluid vertical tabular>
      <Menu.Item
        name='flags'
        as={NavLink}
        to='/flags'
      />
      <Menu.Item
        name='uncloggerHints'
        as={NavLink}
        to='/uncloggerHints'
      />
    </Menu>
  )
}

export default TheRoutingMenu