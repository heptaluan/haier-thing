import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import routes from './config'

const Router = () => <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>

export default Router
