import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const TheHeader: React.FC = () => {
  // username hook
  const [username, setUsername] = useState(null)
  useEffect(() => {
    const currUserName = async (): Promise<void> => {
      const currUser = await Auth.currentAuthenticatedUser()
      setUsername(currUser.username)
    }
    currUserName()
  }, [])

  const signOut = async (): Promise<void> => {
    await Auth.signOut()
  }

  return (
    <Navbar>
      <Navbar.Brand>
        <Link to="/">
          <h3 style={{ color: 'red' }}>Tafalk! Admin</h3>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>Hello, {username}</Navbar.Text>&emsp;
        <Button variant="danger" onClick={signOut}>
          LOGOUT
        </Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default TheHeader
