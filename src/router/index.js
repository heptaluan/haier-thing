import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import routes from './config'
import useMqtt from '../hook/useMqtt'

export const UserContext = React.createContext('')

const Router = () => {
  // const data = useMqtt()
  return (
    <>
      {/* <UserContext.Provider value={data}> */}
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      {/* </UserContext.Provider> */}
    </>
  )
}

export default Router
