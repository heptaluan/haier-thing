import React, { memo, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import './index.scss'

export default memo(
  withRouter(function Index(props) {
    // console.log(props.route.routes, 'props.route.routes')
    useEffect(() => {
      if (props.location.pathname === '/family') {
        props.history.push('/family/home')
      }
    }, [props.history, props.location.pathname])
    return (
      <div className="family">
        <div className="family-links">
          <Link to="/family/home">智能家居</Link>
          <Link to="/family/systems">智能安防</Link>
          <Link to="/family/entertainment">智能娱乐</Link>
        </div>
        <div className="family-content">{renderRoutes(props.route.routes)}</div>
      </div>
    )
  })
)
