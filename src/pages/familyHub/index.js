import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import './index.scss'
import FamilyContent from '../../components/family/familyContent/index'
import HomeMenu from '../../components/common/homeMenu/index'
import TopHeader from '../../components/common/topHeader/index'

export default memo(
  withRouter(function Index(props) {
    // console.log(props.route.routes, 'props.route.routes')
    // useEffect(() => {
    //   if (props.location.pathname === '/family') {
    //     props.history.push('/family/home')
    //   }
    // }, [props.history, props.location.pathname])
    return (
      <>
        <TopHeader />
        <div className="family-hub-box">
          <HomeMenu />
          <FamilyContent />
        </div>
      </>
    )
  })
)
