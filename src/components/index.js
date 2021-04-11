import React, { memo, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router-dom'
import { getUserRole } from '../api/api'

export default memo(
  withRouter(function IndexComponent(props) {
    let isLogin = getUserRole()
    // console.log(props.route, 'props.route', props.location)
    useEffect(() => {
      if (isLogin && isLogin === 'user') {
        if (props.location.pathname === '/') {
          props.history.push('/home')
        }
      } else if (isLogin && isLogin === 'sysadmin') {
        props.history.push('/setting')
      } else {
        props.history.push('/login')
      }
    }, [isLogin, props.history, props.location.pathname])
    return (
      <>
        <div className="content">{renderRoutes(props.route.routes)}</div>
      </>
    )
  })
)
