import React from 'react'
import { Redirect } from 'react-router-dom'

const HomeView: React.FC = () => {

  const defaultHomeRedirectObject = { pathname: '/flags'}
  return (
    <Redirect to={defaultHomeRedirectObject}></Redirect>
  )
}

export default HomeView