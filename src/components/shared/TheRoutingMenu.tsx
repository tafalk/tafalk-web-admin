import React from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const TheRoutingMenu: React.FC = () => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link as={NavLink} to="/flags">
        Flags
      </Nav.Link>
      <Nav.Link as={NavLink} to="/uncloggerPrompts">
        Unclogger Prompts
      </Nav.Link>
    </Nav>
  )
}

export default TheRoutingMenu
