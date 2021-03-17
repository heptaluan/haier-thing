import React, { memo, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router-dom'

export default memo(
  withRouter(function IndexComponent(props) {
    console.log(props.route, 'props.route', props.location)
    useEffect(() => {
      if (props.location.pathname === '/') {
        props.history.push('/home')
      }
    }, [props.history, props.location.pathname])
    return (
      <div>
        <div className="content">{renderRoutes(props.route.routes)}</div>
      </div>
    )
  })
)
