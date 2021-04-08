import React, { memo, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router-dom'

export default memo(
  withRouter(function IndexComponent(props) {
    useEffect(() => {
      if (props.location.pathname === '/') {
        props.history.push('/home')
      }
    }, [props.history, props.location.pathname])
    return (
      <>
        <div className="content">{renderRoutes(props.route.routes)}</div>
      </>
    )
  })
)
