import React, { memo, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router-dom'
import './index.scss'
import FamilyMenu from '../../components/family/familyMenu/index'

export default memo(
  withRouter(function Index(props) {
    // console.log(props.route.routes, 'props.route.routes')
    useEffect(() => {
      if (props.location.pathname === '/family') {
        props.history.push('/family/home')
      }
    }, [props.history, props.location.pathname])
    return (
      <div className="family-hub">
        <div className="family-content">
          <FamilyMenu />
          {renderRoutes(props.route.routes)}
        </div>
      </div>
    )
  })
)
